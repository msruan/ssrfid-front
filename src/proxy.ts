import type { NextRequest } from "next/server";
import { tokenCookiesKey } from "./cookies";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(tokenCookiesKey)?.value;

  if (!token && !request.nextUrl.pathname.startsWith("/autenticacao/login")) {
    return Response.redirect(new URL("/autenticacao/login", request.url));
  }

  if (token && request.nextUrl.pathname.startsWith("/autenticacao/login")) {
    return Response.redirect(new URL("/", request.url));
  }

  return;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/autenticacao/login"],
};
