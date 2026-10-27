import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const pages=["index.html","services.html","work.html","about.html","contact.html"];
const errors=[];
const exists=p=>fs.existsSync(path.join(root,p));
const data=p=>fs.readFileSync(path.join(root,p),"utf8");
const ignore=/^(https?:|mailto:|tel:|#|data:)/i;

for(const page of pages){
 if(!exists(page)){errors.push(page+" missing");continue}
 const html=data(page);
 if(!/^<!doctype html>/i.test(html))errors.push(page+": doctype");
 if((html.match(/<h1(?:\s|>)/gi)||[]).length!==1)errors.push(page+": exactly one H1 required");
 for(const token of ["<title>","name=\"description\"","rel=\"canonical\"","<main id=\"main\">","</main>","</footer>","/assets/css/portfolio-v2.css","/assets/js/portfolio-v2.js"])if(!html.includes(token))errors.push(page+": missing "+token);
 const match=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
 if(!match){errors.push(page+": JSON-LD missing")}else{
  try{const obj=JSON.parse(match[1]);if(!obj["@graph"]?.some(item=>item["@type"]==="Person"))errors.push(page+": Person schema missing")}
  catch(e){errors.push(page+": invalid JSON-LD "+e.message)}
 }
 const urls=[...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m=>m[1]);
 for(const url of urls){
  if(ignore.test(url))continue;
  if(!url.startsWith("/")){errors.push(page+": unsupported relative URL "+url);continue}
  const normalized=decodeURIComponent(url.split("#")[0].split("?")[0]);
  const target=normalized==="/"?"/index.html":normalized;
  const full=path.resolve(root,"."+target);
  if(!full.startsWith(root+path.sep))errors.push(page+": traversal "+url);
  else if(!fs.existsSync(full))errors.push(page+": missing linked resource "+url);
 }
 if(/href="#"/.test(html))errors.push(page+": empty anchor");
 if(/lorem ipsum|fake testimonial|example\.com/gi.test(html))errors.push(page+": mock copy leaked");
}
for(const asset of ["assets/css/portfolio-v2.css","assets/js/portfolio-v2.js","worker/index.js","robots.txt","sitemap.xml","resume.html","hospice-nursing-home-billing-rcm.html","remote-monitoring-rcm-architecture.html"])if(!exists(asset))errors.push("missing asset "+asset);
if(exists("sitemap.xml")){
 const s=data("sitemap.xml");
 for(const p of pages){const u="https://aftabshaukat.me/"+(p==="index.html"?"":p);if(!s.includes("<loc>"+u+"</loc>"))errors.push("sitemap missing "+p)}
}
if(errors.length){console.error("Portfolio validation failed:\n"+errors.map(e=>" - "+e).join("\n"));process.exit(1)}
console.log("Portfolio validation passed: "+pages.length+" pages, routes, scripts, canonical tags, schema and sitemap.");
