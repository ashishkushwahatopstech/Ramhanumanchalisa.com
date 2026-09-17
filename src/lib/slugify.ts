/**
 * Centralized Slug Generation Utility for Ram Hanuman Chalisa
 * Prevents truncation mid-word, strips hanging prepositions/conjunctions,
 * and handles collision deduplication cleanly (e.g. -2, -3) instead of raw underscores.
 */

export function generateSlug(title: string, existingSlugs: string[] = []): string {
  if (!title || typeof title !== "string") return "";

  let baseSlug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accent diacritics
    .replace(/[^a-z0-9\s-]/g, "")    // remove special characters except spaces & hyphens
    .trim()
    .replace(/\s+/g, "-")            // convert whitespace to hyphens
    .replace(/-+/g, "-");            // collapse multiple hyphens

  // Strip dangling trailing prepositions/conjunctions if cut off or unnecessary
  baseSlug = baseSlug.replace(/-(in|and|or|of|with|for|to|at|by)$/, "");

  // If slug became empty, provide default
  if (!baseSlug) {
    baseSlug = "post";
  }

  // Deduplicate against existing slugs
  let finalSlug = baseSlug;
  let counter = 2;
  const slugSet = new Set(existingSlugs.map((s) => s.toLowerCase()));

  while (slugSet.has(finalSlug.toLowerCase())) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return finalSlug;
}
