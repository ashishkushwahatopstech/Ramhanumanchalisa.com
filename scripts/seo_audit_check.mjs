import fs from "fs";

// 1. Core pages
const staticPages = [
  { slug: "", file: "src/pages/index.astro" },
  { slug: "hanuman-chalisa-meaning", file: "src/pages/hanuman-chalisa-meaning.astro" },
  { slug: "hanuman-chalisa-audio-mp3", file: "src/pages/hanuman-chalisa-audio-mp3.astro" },
  { slug: "hanuman-chalisa-english", file: "src/pages/hanuman-chalisa-english.astro" },
  { slug: "hanuman-chalisa-pdf", file: "src/pages/hanuman-chalisa-pdf.astro" },
  { slug: "hanuman-chalisa-benefits", file: "src/pages/hanuman-chalisa-benefits/index.astro" },
  { slug: "shri-hanuman-chalisa-path-vidhi", file: "src/pages/shri-hanuman-chalisa-path-vidhi.astro" },
  { slug: "ram-chalisa", file: "src/pages/ram-chalisa.astro" },
  { slug: "ram-hanuman-chalisa", file: "src/pages/ram-hanuman-chalisa.astro" },
  { slug: "sankat-mochan-hanumanashtak", file: "src/pages/sankat-mochan-hanumanashtak.astro" },
  { slug: "hanuman-aarti", file: "src/pages/hanuman-aarti.astro" },
  { slug: "hanuman-stuti", file: "src/pages/hanuman-stuti.astro" },
  { slug: "bajrang-baan", file: "src/pages/bajrang-baan.astro" },
  { slug: "hanuman-jayanti", file: "src/pages/hanuman-jayanti.astro" },
  { slug: "blog", file: "src/pages/blog/index.astro" },
  { slug: "faq", file: "src/pages/faq.astro" },
  { slug: "about", file: "src/pages/about.astro" },
  { slug: "contact", file: "src/pages/contact.astro" },
  { slug: "privacy-policy", file: "src/pages/privacy-policy.astro" },
  { slug: "disclaimer", file: "src/pages/disclaimer.astro" },
];

function computeRenderedTitle(title) {
  let renderedTitle = title.trim();
  if (renderedTitle.includes("Ram Hanuman Chalisa") || renderedTitle.includes("RamHanumanChalisa")) {
    // Brand already present
  } else if (renderedTitle.length <= 37) {
    renderedTitle = `${renderedTitle} | Ram Hanuman Chalisa`;
  } else if (renderedTitle.length <= 44) {
    renderedTitle = `${renderedTitle} | RHC`;
  }
  return renderedTitle;
}

let issues = 0;

for (const p of staticPages) {
  if (!fs.existsSync(p.file)) {
    console.log(`[MISSING FILE] ${p.file}`);
    continue;
  }
  const content = fs.readFileSync(p.file, "utf8");
  
  // Title
  let title = "DEFAULT";
  const titleMatch = content.match(/const\s+(?:pageTitle|title)\s*=\s*["'`]([^"'`\n]+)["'`]/);
  if (titleMatch) title = titleMatch[1];
  else {
    const layoutTitleMatch = content.match(/<Layout[^>]*title=["'`]([^"'`\n]+)["'`]/);
    if (layoutTitleMatch) title = layoutTitleMatch[1];
  }

  // Meta description
  let desc = "DEFAULT";
  const descMatch = content.match(/const\s+(?:pageDescription|description)\s*=\s*["'`]([^"'`\n]+)["'`]/);
  if (descMatch) desc = descMatch[1];
  else {
    const layoutDescMatch = content.match(/<Layout[^>]*description=["'`]([^"'`\n]+)["'`]/);
    if (layoutDescMatch) desc = layoutDescMatch[1];
  }

  const renderedTitle = computeRenderedTitle(title);

  // Check titles
  const titleValid = renderedTitle.length >= 50 && renderedTitle.length <= 60;
  const descValid = desc.length >= 140 && desc.length <= 155;

  if (!titleValid) {
    console.log(`[TITLE LENGTH ISSUE] ${p.slug || "home"}: len=${renderedTitle.length} -> "${renderedTitle}"`);
    issues++;
  }
  if (!descValid) {
    console.log(`[DESC LENGTH ISSUE] ${p.slug || "home"}: len=${desc.length} -> "${desc}"`);
    issues++;
  }
}

console.log(`\nStatic audit complete. Total issues: ${issues}`);
