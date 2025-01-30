import { NextRequest, NextResponse } from "next/server";

export const ALLOWED_ORIGINS = [
  "http://localhost:3001",
  "http://localhost:3002",
  `https://${process.env.VERCEL_PRODUCTION_LAR_CANINO_URL}`,
  `https://${process.env.VERCEL_PRODUCTION_LAR_CANINO_DASHBOARD_URL}`,
];

export const middleware = (request: NextRequest) => {
  console.log("Middleware funcionando")
  const requestOrigin = request.headers.get("origin");
  const accessOrigin =
    ALLOWED_ORIGINS.find((origin) => origin === requestOrigin) ||
    ALLOWED_ORIGINS[0];
  console.log("allowedOrigin", accessOrigin);

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": accessOrigin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin",
      },
    });
  }

  const response = NextResponse.next();

  response.headers.append("Access-Control-Allow-Origin", accessOrigin);
  response.headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.append("Access-Control-Allow-Headers", "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version");
  response.headers.append("Vary", "Origin");
  response.headers.append("Access-Control-Allow-Credentials", "true");
  response.headers.append("Access-Control-Max-Age", "86400");

  // const isLoggedIn = request.cookies.get("token")?.value || null;
  // console.log("Headers recebidos:", request.headers)
  // console.log("Cookies recebidos:", request.cookies)
  // console.log('isloggedin middleware', isLoggedIn)
  // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  // const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // if (isApiAuthRoute) {
  //   return response;
  // }

  // if (isAuthRoute) {
  //   if (isLoggedIn) {
  //     console.log("Logado");
  //     return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //   }
  //   return response;
  // }

  // Verificar porque não está funcionando
  // if (!isLoggedIn && !isPublicRoute) {
  //   console.log("Não está logado.");
  //   return NextResponse.redirect(new URL("/login", nextUrl));
  // }

  return response;
};

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
