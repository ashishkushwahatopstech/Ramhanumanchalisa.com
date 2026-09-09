import fs from 'fs';

const filePath = 'src/data/imported-posts.json';
const posts = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const p = posts.find(x => x.slug === 'hanuman-photos-images-pics');
if (p) {
  p.content = p.content.replace('alt="download<br />hanuman picture"', 'alt="Lord Hanuman Ji Photo HD Wallpaper"');
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf8');
console.log('Fixed broken alt in hanuman-photos-images-pics successfully.');
