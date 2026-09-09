import fs from 'fs';

const filePath = 'src/data/imported-posts.json';
const posts = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let updatedCount = 0;

posts.forEach(p => {
  if (p.slug === 'krishna-photos-images-pics') {
    p.content = p.content.replace('krishna-wallpapers.jpeg"  />', 'krishna-wallpapers.jpeg" alt="Lord Krishna Beautiful Wallpaper HD" />');
    p.content = p.content.replace('krishna-pics.jpg"  />', 'krishna-pics.jpg" alt="Lord Krishna Ji Divine Picture" />');
    p.content = p.content.replace('krishna-images.jpg"  />', 'krishna-images.jpg" alt="Lord Krishna Divine Blessing Image" />');
    p.content = p.content.replace(/alt=""\s+border="0"/g, 'border="0"');
    updatedCount += 3;
  } else if (p.slug === 'shri-saraswati-chalisa-lyrics-in-hindi') {
    p.content = p.content.replace(
      'src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiL3c0-6xp6XNX44lhMLr1Ow67tbG2NE09cyWFdcCWJl0UXp8hR3g-MeaGbjy_WqdrGWDAXxNjdo2fIY7Z0_gHEtQ46fQexuMcg-L8Ip5LcoPq0nxzKhTBhP30-hySiV8kFpa9G259R3Iw/s320/saraswati-chalisa.jpg"',
      'src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiL3c0-6xp6XNX44lhMLr1Ow67tbG2NE09cyWFdcCWJl0UXp8hR3g-MeaGbjy_WqdrGWDAXxNjdo2fIY7Z0_gHEtQ46fQexuMcg-L8Ip5LcoPq0nxzKhTBhP30-hySiV8kFpa9G259R3Iw/s320/saraswati-chalisa.jpg" alt="Maa Saraswati Chalisa Devotional Art"'
    );
    updatedCount++;
  } else if (p.slug === 'brihaspati-chalisa-lyrics-in-hindi') {
    p.content = p.content.replace(
      'src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhE9g-FB4-DBjbklsOj39ypCs4cD_5Ff9Yfwgs0X5fzXBkl-tHJTLP0-tXpmDl88zkbZYPKgrlwl994X5-HWMLeu9KFh3IXoDQK6K2S8arUZR9efdQ8b_90OO8X_HwlfaUDKrwujZIDe9ji1JochYr6fSmsOg5-QDOBbjYZu8NzYMOc0wap9v-mcpRk9xWE/w416-h376/brihaspati-chalisa.jpg"',
      'src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhE9g-FB4-DBjbklsOj39ypCs4cD_5Ff9Yfwgs0X5fzXBkl-tHJTLP0-tXpmDl88zkbZYPKgrlwl994X5-HWMLeu9KFh3IXoDQK6K2S8arUZR9efdQ8b_90OO8X_HwlfaUDKrwujZIDe9ji1JochYr6fSmsOg5-QDOBbjYZu8NzYMOc0wap9v-mcpRk9xWE/w416-h376/brihaspati-chalisa.jpg" alt="Shri Brihaspati Dev Chalisa Sacred Image"'
    );
    updatedCount++;
  } else if (
    p.slug === 'shri-ram-chandra-kripalu-bhajman-lyrics' ||
    p.slug === 'aarti-shri-ramayan-ji-ki-lyrics' ||
    p.slug === 'shri-ram-jai-ram-jai-jai-ram-aarti' ||
    p.slug === 'mangal-bhavan-amangal-haari-lyrics' ||
    p.slug === 'ram-siya-ram-siya-ram-lyrics'
  ) {
    if (p.content.includes('/s320/shri-ram.jpg') && !p.content.includes('/s320/shri-ram.jpg" alt=')) {
      p.content = p.content.replace('/s320/shri-ram.jpg"', '/s320/shri-ram.jpg" alt="Bhagwan Shri Ram Chandra Ji Devotional Art"');
      updatedCount++;
    }
  } else if (
    p.slug === 'pavan-tanay-sankat-haran-mangal-murati' ||
    p.slug === 'jai-jai-hanuman-gusai-aarti'
  ) {
    if (p.content.includes('/s320/hanuman.webp') && !p.content.includes('/s320/hanuman.webp" alt=')) {
      p.content = p.content.replace('/s320/hanuman.webp"', '/s320/hanuman.webp" alt="Sankat Mochan Shri Hanuman Ji Deity Art"');
      updatedCount++;
    }
  } else if (p.slug === 'hanuman-chalisa-in-punjabi') {
    if (p.content.includes('=w400-h195"') && !p.content.includes('=w400-h195" alt=')) {
      p.content = p.content.replace('=w400-h195"', '=w400-h195" alt="Shri Hanuman Chalisa Punjabi Text Guide"');
      updatedCount++;
    }
  } else if (p.slug === 'hanuman-photos-images-pics') {
    p.content = p.content.replace(/alt="download<br \/>\s*हनुमान/g, 'alt="Lord Hanuman Ji Photo Wallpaper HD');
    updatedCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf8');
console.log(`Saved updated imported-posts.json! Fixed count: ${updatedCount}`);
