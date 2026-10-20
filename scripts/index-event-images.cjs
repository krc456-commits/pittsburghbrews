const fs = require("node:fs");
const path = require("node:path");
const folder = path.join(process.cwd(), "public/brand/events");
const output = path.join(process.cwd(), "src/data/eventImageFiles.json");
const files = fs.existsSync(folder) ? fs.readdirSync(folder).filter(name => /\\.(png|jpe?g|webp|avif)$/i.test(name)).sort() : [];
fs.writeFileSync(output, JSON.stringify(files, null, 2) + "\\n");
