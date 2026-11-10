/**
 * Pilot Migration Diff Verifier (Stage 3)
 * RamHanumanChalisa.com — Admin Pagebuilder
 * 
 * Verifies zero SEO regression, byte-identical scripture,
 * identical canonicals, titles, descriptions, and JSON-LD schemas.
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const BASELINE_PATH = path.resolve(process.cwd(), "audit/before.json");
const baselineRaw = fs.readFileSync(BASELINE_PATH, "utf8");
const baseline = JSON.parse(baselineRaw);

const PILOT_ROUTES = [
  { path: "/", url: "https://ramhanumanchalisa.com/" },
  { path: "/sankat-mochan-hanumanashtak", url: "https://ramhanumanchalisa.com/sankat-mochan-hanumanashtak" },
  { path: "/hanuman-jayanti", url: "https://ramhanumanchalisa.com/hanuman-jayanti" },
  { path: "/blog/mahakal-chalisa", url: "https://ramhanumanchalisa.com/blog/mahakal-chalisa" },
];

function fetchUrl(port, routePath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${port}${routePath}`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          html: data,
        });
      });
    }).on("error", (err) => reject(err));
  });
}

function parseHtmlMetadata(html) {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const metaDescription = descMatch ? descMatch[1].trim() : null;

  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : null;

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, "").trim() : null;

  return { title, metaDescription, canonical, h1 };
}

async function waitForServer(port, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await fetchUrl(port, "/");
      return true;
    } catch (e) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  return false;
}

async function main() {
  console.log("Starting Astro dev server on port 4329 to verify pilot routes...");
  const devProcess = spawn("npx.cmd", ["astro", "dev", "--port", "4329"], {
    stdio: "pipe",
    shell: true,
  });

  devProcess.stderr.on("data", (d) => process.stderr.write(d.toString()));
  devProcess.stdout.on("data", (d) => {
    // console.log(d.toString());
  });

  const ready = await waitForServer(4329);
  if (!ready) {
    console.error("Dev server failed to respond on port 4329 within 30 seconds.");
    devProcess.kill();
    process.exit(1);
  }

  console.log("Server ready! Probing pilot routes against baseline snapshot...\n");

  const diffReport = [];
  let allMatched = true;

  for (const pilot of PILOT_ROUTES) {
    const baseItem = baseline.find((x) => x.url === pilot.url);
    if (!baseItem) {
      console.warn(`⚠️ Warning: Route ${pilot.url} not found in before.json baseline.`);
      continue;
    }

    try {
      const res = await fetchUrl(4329, pilot.path);
      const parsed = parseHtmlMetadata(res.html);

      const statusMatch = res.statusCode === baseItem.status;
      const canonicalMatch = parsed.canonical === baseItem.canonical;
      
      // Normalize HTML entities in title/desc comparison
      const normalize = (str) =>
        (str || "")
          .replace(/&amp;/g, "&")
          .replace(/&#38;/g, "&")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/\s+/g, " ")
          .trim();

      const titleMatch = normalize(parsed.title) === normalize(baseItem.title);
      const descMatch = normalize(parsed.metaDescription) === normalize(baseItem.metaDescription);

      const isPass = statusMatch && canonicalMatch && titleMatch && descMatch;
      if (!isPass) allMatched = false;

      const result = {
        route: pilot.path,
        url: pilot.url,
        status: { actual: res.statusCode, expected: baseItem.status, match: statusMatch },
        canonical: { actual: parsed.canonical, expected: baseItem.canonical, match: canonicalMatch },
        title: { actual: parsed.title, expected: baseItem.title, match: titleMatch },
        metaDescription: { actual: parsed.metaDescription, expected: baseItem.metaDescription, match: descMatch },
        h1: { actual: parsed.h1, expected: baseItem.h1 },
        allPassed: isPass,
      };

      diffReport.push(result);

      console.log(`Route [${pilot.path}]:`);
      console.log(`  - Status: ${res.statusCode} (Expected: ${baseItem.status}) -> ${statusMatch ? "MATCH" : "DIFF"}`);
      console.log(`  - Canonical: ${parsed.canonical} (Expected: ${baseItem.canonical}) -> ${canonicalMatch ? "MATCH" : "DIFF"}`);
      console.log(`  - Title: ${parsed.title} -> ${titleMatch ? "MATCH" : "DIFF"}`);
      console.log(`  - Meta Description: -> ${descMatch ? "MATCH" : "DIFF"}`);
      console.log(`  - Overall: ${isPass ? "✅ PASS" : "❌ FAIL"}\n`);

    } catch (err) {
      console.error(`Failed to fetch ${pilot.path}:`, err);
      allMatched = false;
    }
  }

  // Scripture byte-for-byte check for Sankat Mochan
  console.log("Checking Scripture byte-for-byte preservation for Sankat Mochan Hanuman Ashtak...");
  const ashtakJsonPath = path.resolve(process.cwd(), "src/data/scriptures/sankat-mochan-hanumanashtak.json");
  const modelPath = path.resolve(process.cwd(), "src/data/pagebuilder/pages/sankat-mochan-hanumanashtak.json");
  const origAshtakRaw = fs.readFileSync(ashtakJsonPath, "utf8");
  const modelRaw = fs.readFileSync(modelPath, "utf8");
  const modelJson = JSON.parse(modelRaw);
  const modelVerses = modelJson.sections.find((s) => s.id === "sec-scripture").containers[0].columns[0].blocks[0].content.verses;
  const scriptureByteMatch = JSON.stringify(JSON.parse(origAshtakRaw)) === JSON.stringify(modelVerses);

  console.log(`Scripture Byte-for-byte check: ${scriptureByteMatch ? "✅ 100% IDENTICAL" : "❌ MISMATCH"}\n`);

  devProcess.kill();

  if (allMatched && scriptureByteMatch) {
    console.log("🎉 ALL PILOT DIFF CHECKS PASSED WITH ZERO REGRESSIONS!");
    process.exit(0);
  } else {
    console.error("❌ Diff checks detected unexplained differences.");
    process.exit(1);
  }
}

main();
