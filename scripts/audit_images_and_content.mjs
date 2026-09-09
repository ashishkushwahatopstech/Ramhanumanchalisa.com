import fs from "fs";
import path from "path";

function getFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files = files.concat(getFiles(full));
    else if (entry.name.endsWith('.astro') || entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.jsx')) files.push(full);
  }
  return files;
}

const files = getFiles('./src');
const imgRegex = /<img[\s\S]*?>/gi;
console.log("=== CHECKING ALL IMG TAGS IN SRC ===");
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = [...content.matchAll(imgRegex)];
  if (matches.length > 0) {
    console.log(file, 'Found', matches.length, 'img tags:');
    matches.forEach(m => {
      const tag = m[0].replace(/\s+/g, ' ');
      const altMatch = tag.match(/alt=(?:"([^"]*)"|'([^']*)'|{([^}]*)})/i);
      const altVal = altMatch ? (altMatch[1] || altMatch[2] || altMatch[3]) : 'MISSING';
      console.log('   Tag:', tag.slice(0, 110));
      console.log('   Alt Value:', altVal);
    });
  }
}

// Check imported-posts.json for images in markdown or html
console.log("\n=== CHECKING IMPORTED POSTS CONTENT FOR IMAGES ===");
const posts = JSON.parse(fs.readFileSync('./src/data/imported-posts.json', 'utf8'));
let postsWithImg = 0;
let postsWithoutAlt = 0;
const missingAltDetails = [];

posts.forEach(p => {
  const mdImgs = [...p.content.matchAll(/!\[(.*?)\]\((.*?)\)/g)];
  const htmlImgs = [...p.content.matchAll(/<img[^>]*>/gi)];
  
  if (mdImgs.length > 0 || htmlImgs.length > 0) {
    postsWithImg++;
  }

  mdImgs.forEach(m => {
    if (!m[1] || m[1].trim() === "") {
      postsWithoutAlt++;
      missingAltDetails.push({ slug: p.slug, src: m[2], type: "markdown", raw: m[0] });
    }
  });

  htmlImgs.forEach(m => {
    const altMatch = m[0].match(/alt=(?:"([^"]*)"|'([^']*)')/i);
    if (!altMatch || !altMatch[1] || altMatch[1].trim() === "") {
      postsWithoutAlt++;
      const srcMatch = m[0].match(/src=(?:"([^"]*)"|'([^']*)')/i);
      missingAltDetails.push({ slug: p.slug, src: srcMatch ? srcMatch[1] : "unknown", type: "html", raw: m[0] });
    }
  });
});

console.log("Total posts with images:", postsWithImg);
console.log("Total images missing ALT in posts:", postsWithoutAlt);
if (missingAltDetails.length > 0) {
  console.log("First 10 missing ALTs:", missingAltDetails.slice(0, 10));
}
