// The Funniest Office Joke, Judged Head to Head
// Writes one single-line office joke to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "We held a meeting to decide whether this meeting could have been an email, then booked a follow-up to discuss why we couldn't decide.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, JOKE, "utf8");
console.log(JOKE);

// Self-checking gate: the sealed scorer needs 1-200 chars, non-blank,
// a single line. Fail loudly instead of shipping a bad entry.
const written = readFileSync(outPath, "utf8");
if (!written || written.trim().length === 0) {
  console.error("gate failed: entry.txt is missing or empty");
  process.exit(1);
}
if (written.length < 1 || written.length > 200) {
  console.error(`gate failed: entry is ${written.length} chars, must be 1-200`);
  process.exit(1);
}
if (written.includes("\n")) {
  console.error("gate failed: entry must be a single line");
  process.exit(1);
}
console.log(`gate ok: ${written.length} chars`);
