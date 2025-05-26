import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                console.log("Not logged in");
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                console.log("Logged in");
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            console.log("Not logged in");
            return true;
        },
    },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;