import { readdirSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import {join} from "node:path";
const dir=join(process.cwd(),"public","brand","events");
const out=join(process.cwd(),"src","data","eventImageFiles.json");
const files=existsSync(dir)?readdirSync(dir).filter(name=>/\.(png|jpe?g|webp|avif)$/i.test(name)).sort():[];
mkdirSync(join(process.cwd(),"src","data"),{recursive:true});
writeFileSync(out,JSON.stringify(files,null,2)+"\n");
console.log("Event flyer manifest:",files.length,"images");
