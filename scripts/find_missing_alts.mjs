import fs from "fs";

const posts = JSON.parse(fs.readFileSync('./src/data/imported-posts.json', 'utf8'));
const missingList = [];

posts.forEach((p, pIndex) => {
  const htmlImgs = [...p.content.matchAll(/<img[^>]*>/gi)];
  htmlImgs.forEach((m) => {
    const altMatch = m[0].match(/alt=(?:"([^"]*)"|'([^']*)')/i);
    if (!altMatch || !altMatch[1] || altMatch[1].trim() === '') {
      missingList.push({
        postIndex: pIndex,
        slug: p.slug,
        title: p.title,
        imgTag: m[0],
      });
    }
  });
});

console.log(`Found ${missingList.length} images with missing/empty alt:`);
missingList.forEach((item, i) => {
  console.log(`${i + 1}. [${item.slug}] - ${item.title}`);
  console.log(`   TAG: ${item.imgTag}`);
});
