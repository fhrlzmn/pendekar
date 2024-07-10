import { auth } from '@/auth';

import {
  apiAuthPrefix,
  adminRoutes,
  userRoutes,
  authRoutes,
  publicRoutes,
} from '@/routes';

export default auth((req): any => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
