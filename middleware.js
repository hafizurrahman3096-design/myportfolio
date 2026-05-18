import { NextResponse } from "next/server";

function base64UrlToBytes(input) {
  const base64 = input
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(input.length / 4) * 4, "=");

  return Uint8Array.from(atob(base64), (char) =>
    char.charCodeAt(0)
  );
}

async function verifyToken(token) {
  if (!token || !process.env.JWT_SECRET) {
    return false;
  }

  const [header, payload, signature] = token.split(".");

  if (!header || !payload || !signature) {
    return false;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(process.env.JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const isValid = await crypto.subtle.verify(
    "HMAC",
    key,
    base64UrlToBytes(signature),
    new TextEncoder().encode(`${header}.${payload}`)
  );

  if (!isValid) {
    return false;
  }

  const claims = JSON.parse(
    new TextDecoder().decode(base64UrlToBytes(payload))
  );

  return !claims.exp || claims.exp * 1000 > Date.now();
}

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;
  const isAdminPage =
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login";

  if (!isAdminPage) {
    return NextResponse.next();
  }

  if (isAdminPage && !token) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  if (await verifyToken(token)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(
    new URL("/admin/login", request.url)
  );
}

export const config = {
  matcher: ["/admin/:path*"],
};
