import fs from "fs";
import path from "path";

const indexSrc = path.resolve("index.html");
const indexDest = path.resolve("dist/index.html");

let html = fs.readFileSync(indexSrc, "utf-8");
html = html.replace("%SCRIPT_SRC%", "/idv.js");
fs.writeFileSync(indexDest, html);
