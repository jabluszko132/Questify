import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
 
export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                .object({ username: z.string(), password: z.string() })
                .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { username, password } = parsedCredentials.data;
                    const res = await fetch(`http://localhost:3000/auth/${username}/${password}`, { method: "POST" });
                    console.log("res: ", res);

                    if (!res.ok) {
                        const text = await res.text();
                        console.error(`Error ${res.status}: ${text}`);
                        return null;
                    }
                    const user = await res.json();
                    console.log("data: ", user);
                    return user;
                }
        
                return null;
            },
        }),
    ],
});