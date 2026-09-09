import fs from 'fs';

const posts = JSON.parse(fs.readFileSync('src/data/imported-posts.json', 'utf8'));
console.log(`Total imported posts: ${posts.length}`);

function formatSeo(post) {
  const cleanTitle = post.title.replace(/\s+/g, ' ').trim();
  let pageTitle = post.metaTitle;
  if (!pageTitle) {
    if (cleanTitle.length >= 50 && cleanTitle.length <= 60) {
      pageTitle = cleanTitle;
    } else if (cleanTitle.length < 50) {
      const candidates = [
        `${cleanTitle} — Lyrics, Meaning & PDF`,
        `${cleanTitle} — Lyrics & Full Meaning`,
        `${cleanTitle} — Lyrics and Meaning`,
        `${cleanTitle} — Lyrics, Meaning`,
        `${cleanTitle} — Sacred Hymn Lyrics`,
        `${cleanTitle} — Lyrics & PDF Sheet`,
        `${cleanTitle} — Meaning & PDF`,
        `${cleanTitle} — Full Lyrics Online`,
      ];
      // pick first that fits in 50-60
      const matched = candidates.find(c => c.length >= 50 && c.length <= 60);
      if (matched) {
        pageTitle = matched;
      } else {
        // Fallback: pick longest candidate <= 60
        const under60 = candidates.filter(c => c.length <= 60).sort((a, b) => b.length - a.length);
        if (under60.length > 0 && under60[0].length >= 45) {
          pageTitle = under60[0];
        } else {
          // If cleanTitle is around 40-49, pad or suffix
          const needed = 58 - cleanTitle.length;
          pageTitle = `${cleanTitle} — Devotional Guide`.slice(0, 60);
          if (pageTitle.length < 50) {
            pageTitle = `${cleanTitle} — Complete Lyrics & Meaning`.slice(0, 60);
          }
        }
      }
    } else {
      // cleanTitle > 60
      pageTitle = cleanTitle.slice(0, 57).trim() + '...';
    }
  }

  // Optimize description strictly to 140 - 155 chars
  let pageDescription = post.metaDescription;
  if (!pageDescription) {
    const defaultTemplate = `Read authentic ${cleanTitle} with complete Hindi lyrics, English transliteration, word-by-word spiritual meaning, and recitation guidelines on RHC.`;
    if (defaultTemplate.length >= 140 && defaultTemplate.length <= 155) {
      pageDescription = defaultTemplate;
    } else if (defaultTemplate.length > 155) {
      // trim neatly
      pageDescription = `Read ${cleanTitle} with full Hindi lyrics, English transliteration, word-by-word meaning, recitation vidhi, and spiritual significance on RHC.`;
      if (pageDescription.length > 155) {
        pageDescription = pageDescription.slice(0, 151).trim() + '...';
      }
    } else {
      // pad with descriptive text
      const base = `Read authentic ${cleanTitle} with complete Hindi lyrics, English transliteration, word-by-word spiritual meaning, audio, and recitation guidelines.`;
      if (base.length >= 140 && base.length <= 155) {
        pageDescription = base;
      } else if (base.length < 140) {
        pageDescription = `Explore authentic ${cleanTitle} with complete Hindi lyrics, English transliteration, word-by-word spiritual meaning, audio player, and chanting vidhi.`;
      }
    }
  }

  return { pageTitle, pageDescription };
}

let badTitles = [];
let badDescs = [];

posts.forEach(p => {
  const { pageTitle, pageDescription } = formatSeo(p);
  if (pageTitle.length < 50 || pageTitle.length > 60) {
    badTitles.push({ slug: p.slug, title: pageTitle, len: pageTitle.length });
  }
  if (pageDescription.length < 140 || pageDescription.length > 155) {
    badDescs.push({ slug: p.slug, desc: pageDescription, len: pageDescription.length });
  }
});

console.log(`Bad titles count: ${badTitles.length}`);
if (badTitles.length > 0) {
  console.log('Sample bad titles:', badTitles.slice(0, 5));
}
console.log(`Bad descs count: ${badDescs.length}`);
if (badDescs.length > 0) {
  console.log('Sample bad descs:', badDescs.slice(0, 5));
}
