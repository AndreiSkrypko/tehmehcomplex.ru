import { readFileSync, writeFileSync } from "node:fs";

const path = "c:/Users/sundonk/.cursor/tehmehcomplex.ru/.tmp-docx/unzipped/word/document.xml";
let t = readFileSync(path, "utf8");
t = t.replace(/<w:tab[^/]*\/>/g, "\t");
t = t.replace(/<w:br[^/]*\/>/g, "\n");
t = t.replace(/<\/w:p>/g, "\n");
t = t.replace(/<[^>]+>/g, "");
t = t
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"');
writeFileSync("c:/Users/sundonk/.cursor/tehmehcomplex.ru/.tmp-docx/contract-text.txt", t, "utf8");
console.log(t);
