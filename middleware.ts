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
  const isAdmin = req.auth?.user.role === 'ADMIN';

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes);
  const isUserRoute = nextUrl.pathname.startsWith(userRoutes);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (isAdmin) {
        return Response.redirect(new URL('/admin/dashboard', nextUrl));
      }
      return Response.redirect(new URL('/user/dashboard', nextUrl));
    }

    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl));
  }

  if (isLoggedIn) {
    if (isAdmin && !isAdminRoute) {
      return Response.redirect(new URL('/admin/dashboard', nextUrl));
    }
    if (!isAdmin && !isUserRoute) {
      return Response.redirect(new URL('/user/dashboard', nextUrl));
    }
  }

  return null;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
