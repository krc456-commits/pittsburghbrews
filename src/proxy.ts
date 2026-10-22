import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

export function proxy(request: NextRequest) {
  const password = process.env.PRIVATE_DEV_PASSWORD;
  // Fail closed if the password is missing or deployment configuration fails.
  if (!password) return new Response("Private development site unavailable.",{
    status:503,headers:{"Cache-Control":"no-store","X-Robots-Tag":"noindex,nofollow,noarchive"}
  });
  const auth = request.headers.get("authorization") || "";
  let valid = false;
  if(auth.startsWith("Basic ")) {
    try {
      const decoded = Buffer.from(auth.slice(6),"base64").toString("utf8");
      const sep = decoded.indexOf(":");
      if (sep>0) {
        const username = Buffer.from(decoded.slice(0,sep),"utf8");
        const provided = Buffer.from(decoded.slice(sep+1),"utf8");
        const expectedUser = Buffer.from("developer","utf8");
        const expected = Buffer.from(password,"utf8");
        valid = username.length===expectedUser.length
          && provided.length===expected.length
          && timingSafeEqual(username,expectedUser)
          && timingSafeEqual(provided,expected);
      }
    }catch{valid=false;}
  }
  if(!valid) return new Response("Pittsburgh Brews is temporarily private for development.",{
    status:401,headers:{
      "WWW-Authenticate":'Basic realm="Pittsburgh Brews Private Development", charset="UTF-8"',
      "Cache-Control":"no-store, private",
      "X-Robots-Tag":"noindex,nofollow,noarchive",
      "Content-Type":"text/plain; charset=utf-8"
    }
  });
  const response=NextResponse.next();
  response.headers.set("Cache-Control","no-store, private");
  response.headers.set("X-Robots-Tag","noindex,nofollow,noarchive");
  return response;
}
export const config={matcher:"/:path*"};
