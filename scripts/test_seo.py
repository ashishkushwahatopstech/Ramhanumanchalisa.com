#!/usr/bin/env python3
"""
Automated SEO Audit Runner for RamHanumanChalisa.com
Powered by claude-seo deterministic page checks.
"""

import sys
import os
import json
import subprocess
import argparse

# Path to installed claude-seo scripts
PLUGIN_SCRIPTS = os.path.expanduser("~/.gemini/config/plugins/claude-seo/scripts")
PAGE_CHECKS = os.path.join(PLUGIN_SCRIPTS, "page_checks.py")

DEFAULT_URLS = [
    "https://ramhanumanchalisa.com/",
    "https://ramhanumanchalisa.com/hanuman-chalisa-meaning",
    "https://ramhanumanchalisa.com/hanuman-chalisa-audio-mp3",
    "https://ramhanumanchalisa.com/sankat-mochan-hanumanashtak",
    "https://ramhanumanchalisa.com/hanuman-aarti",
    "https://ramhanumanchalisa.com/ram-chalisa",
    "https://ramhanumanchalisa.com/shri-hanuman-chalisa-path-vidhi",
    "https://ramhanumanchalisa.com/hanuman-chalisa-benefits",
    "https://ramhanumanchalisa.com/hanuman-jayanti",
    "https://ramhanumanchalisa.com/bajrang-baan",
    "https://ramhanumanchalisa.com/hanuman-stuti",
]

def run_audit(target_url):
    print(f"\nAuditing: {target_url}...")
    if not os.path.exists(PAGE_CHECKS):
        print(f"Error: claude-seo scripts not found at {PAGE_CHECKS}")
        sys.exit(1)

    cmd = [sys.executable, PAGE_CHECKS, "--url", target_url, "--json"]
    proc = subprocess.run(cmd, capture_output=True, text=True)

    if proc.returncode != 0:
        print(f"  [FAIL] Error running audit: {proc.stderr or proc.stdout}")
        return False

    try:
        data = json.loads(proc.stdout)
    except json.JSONDecodeError:
        print(f"  [FAIL] Failed to parse output:\n{proc.stdout}")
        return False

    if "error" in data:
        print(f"  [ERROR] {data['error']}")
        return False

    facts = data.get("facts", {})
    summary = data.get("summary", {})
    findings = data.get("findings", [])

    title = facts.get("title", "N/A")
    title_len = facts.get("title_length", 0)
    h1_count = facts.get("h1_count", 0)
    words = facts.get("word_count", 0)
    crit = summary.get("Critical", 0)
    high = summary.get("High", 0)
    med = summary.get("Medium", 0)

    status_icon = "✓" if (crit == 0 and high == 0) else "✗"
    print(f"  [{status_icon}] Title ({title_len} chars): {title[:60]}...")
    print(f"      H1 count: {h1_count} | Words: {words} | Critical: {crit} | High: {high} | Medium: {med}")

    if findings:
        for f in findings:
            sev = f.get("severity")
            msg = f.get("message")
            evi = f.get("evidence", "")
            print(f"      - [{sev}] {msg} ({evi})")

    return crit == 0 and high == 0

def main():
    parser = argparse.ArgumentParser(description="Run claude-seo page checks on site pages.")
    parser.add_argument("--url", help="Audit a specific URL instead of the default list.")
    parser.add_argument("--all", action="store_true", help="Audit all key core routes.")
    args = parser.parse_args()

    urls_to_test = [args.url] if args.url else (DEFAULT_URLS if args.all else [DEFAULT_URLS[0]])

    print(f"=== Starting SEO Audit with claude-seo ({len(urls_to_test)} page(s)) ===")
    total_passed = 0

    for url in urls_to_test:
        success = run_audit(url)
        if success:
            total_passed += 1

    print("\n==========================================")
    print(f"Audit Summary: {total_passed}/{len(urls_to_test)} pages passed critical checks.")
    print("==========================================")

    if total_passed < len(urls_to_test):
        sys.exit(1)

if __name__ == "__main__":
    main()
