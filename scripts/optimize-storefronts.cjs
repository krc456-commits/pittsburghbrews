#!/usr/bin/env node
/**
 * Compress oversized brewery storefronts. Retain originals on main as backup.
 * Only convert when the WebP output is smaller; preserve aspect ratio, no cropping.
 * Update literal image references and remove source files after conversion.
 */
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const root = process.cwd();
const imageRoot = path.join(root, "public", "brand", "breweries");
const sources = [path.join(root, "src")];
const fileExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".css"]);
const conversions = [];
function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
function replaceAllLiteral(text, from, to) {
  return text.split(from).join(to);
}
(async () => {
  const candidates = walk(imageRoot).filter((name) =>
    /storefront/i.test(path.basename(name)) &&
    /\.(png|jpe?g)$/i.test(name)
  );
  for (const source of candidates) {
    const destination = source.replace(/\.(png|jpe?g)$/i, ".webp");
    if (fs.existsSync(destination)) {
      console.log("SKIP: target already exists", destination);
      continue;
    }
    const original = fs.statSync(source).size;
    const image = sharp(source, { failOn: "error" });
    const metadata = await image.metadata();
    const resized = image.rotate().resize({ width: 1800, withoutEnlargement: true });
    const output = await resized.webp({ quality: 82, effort: 6 }).toBuffer();
    if (output.length >= original * 0.95) {
      console.log("SKIP: no significant savings", path.relative(root, source));
      continue;
    }
    fs.writeFileSync(destination, output);
    conversions.push({
      source, destination, before: original, after: output.length,
      width: metadata.width, height: metadata.height,
    });
  }
  // Update all literal asset paths before deleting originals.
  const codeFiles = sources.flatMap(walk).filter(f => fileExtensions.has(path.extname(f)));
  for (const file of codeFiles) {
    const original = fs.readFileSync(file, "utf8");
    let next = original;
    for (const { source, destination } of conversions) {
      const oldRelative = "/" + path.relative(path.join(root, "public"), source).split(path.sep).join("/");
      const newRelative = "/" + path.relative(path.join(root, "public"), destination).split(path.sep).join("/");
      next = replaceAllLiteral(next, oldRelative, newRelative);
      next = replaceAllLiteral(next, oldRelative.slice(1), newRelative.slice(1));
    }
    if (next !== original) fs.writeFileSync(file, next);
  }
  // Check for references that might still point to old assets.
  for (const { source } of conversions) {
    const oldRelative = path.relative(path.join(root, "public"), source).split(path.sep).join("/");
    const remaining = codeFiles.filter(file => fs.readFileSync(file, "utf8").includes(oldRelative));
    if (remaining.length) throw new Error("Old reference remains for " + oldRelative + ": " + remaining.join(", "));
  }
  for (const { source } of conversions) fs.unlinkSync(source);
  const before = conversions.reduce((sum, file) => sum + file.before, 0);
  const after = conversions.reduce((sum, file) => sum + file.after, 0);
  console.log(JSON.stringify({
    converted: conversions.length,
    beforeMB: +(before / 1e6).toFixed(2),
    afterMB: +(after / 1e6).toFixed(2),
    savedMB: +((before - after) / 1e6).toFixed(2),
    percentSaved: before ? +((1 - after / before) * 100).toFixed(1) : 0,
  }, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
