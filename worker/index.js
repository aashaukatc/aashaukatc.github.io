// Optional backend for GitHub Pages portfolio. Requires a separately deployed Cloudflare Worker.
// Required secrets: RESEND_API_KEY, CONTACT_FROM, CONTACT_TO, RATE_SALT.
// Required binding: CONTACT_RL (Workers KV). Never put secrets in this repository.
const originAllowed = new Set(["https://aftabshaukat.me","https://www.aftabshaukat.me"]);
const emailPattern=/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const response=(body,status=200,origin="")=>new Response(JSON.stringify(body),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store",...(originAllowed.has(origin)?{"Access-Control-Allow-Origin":origin,"Vary":"Origin"}:{})}});
async function hash(s){const data=new TextEncoder().encode(s);const dig=await crypto.subtle.digest("SHA-256",data);return [...new Uint8Array(dig)].map(n=>n.toString(16).padStart(2,"0")).join("")}
export default{async fetch(request,env){
 const url=new URL(request.url),origin=request.headers.get("Origin")||"";
 if(url.pathname!=="/api/contact")return response({error:"Not found"},404);
 if(!originAllowed.has(origin))return response({error:"Origin not allowed"},403);
 if(request.method==="OPTIONS")return new Response(null,{status:204,headers:{"Access-Control-Allow-Origin":origin,"Access-Control-Allow-Methods":"POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Max-Age":"86400","Vary":"Origin"}});
 if(request.method!=="POST")return response({error:"Method not allowed"},405,origin);
 if(!env.RESEND_API_KEY||!env.CONTACT_FROM||!env.CONTACT_TO||!env.RATE_SALT||!env.CONTACT_RL)return response({error:"Service unavailable"},503,origin);
 if(!(request.headers.get("Content-Type")||"").startsWith("application/json"))return response({error:"JSON required"},415,origin);
 const len=Number(request.headers.get("Content-Length")||0);if(len>12000)return response({error:"Message too long"},413,origin);
 let data;try{data=await request.json()}catch{return response({error:"Invalid JSON"},400,origin)}
 if(!data||typeof data!=="object"||Array.isArray(data))return response({error:"Invalid request"},400,origin);
 const clean=k=>typeof data[k]==="string"?data[k].trim():"";
 const name=clean("name"),email=clean("email"),service=clean("service"),message=clean("message");
 if(name.length<2||name.length>120||!emailPattern.test(email)||email.length>254||service.length>140||message.length<15||message.length>5000)return response({error:"Invalid fields"},400,origin);
 if(/[<>\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(name+service+email))return response({error:"Invalid characters"},400,origin);
 const clientIp=request.headers.get("CF-Connecting-IP")||"unknown",ipKey="ip:"+await hash(env.RATE_SALT+":"+clientIp),emailKey="email:"+await hash(env.RATE_SALT+":"+email.toLowerCase());
 // KV counters are best-effort; apply Cloudflare WAF/rate limiting at the edge for strong enforcement.
 for(const [key,limit] of [[ipKey,5],[emailKey,3]]){const count=Number(await env.CONTACT_RL.get(key)||"0");if(count>=limit)return response({error:"Too many requests; please email directly"},429,origin);await env.CONTACT_RL.put(key,String(count+1),{expirationTtl:900})}
 const text="New AftabShaukat.me inquiry\n\nName: "+name+"\nEmail: "+email+"\nTopic: "+service+"\n\n"+message+"\n\nPlease review before responding.";
 let upstream;try{upstream=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+env.RESEND_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({from:env.CONTACT_FROM,to:[env.CONTACT_TO],reply_to:email,subject:"Portfolio inquiry: "+(service||"General collaboration"),text})})}catch{return response({error:"Delivery unavailable"},502,origin)}
 if(!upstream.ok)return response({error:"Delivery unavailable"},502,origin);
 return response({ok:true},200,origin);
}};
