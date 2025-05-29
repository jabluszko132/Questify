import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

const api = process.env.NEXT_PUBLIC_API_URL 
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
                    const res = await fetch(`${api}/auth/${username}/${password}`, { method: "POST" });

                    if (!res.ok) {
                        const text = await res.text();
                        console.error(`Error ${res.status}: ${text}`);
                        return null;
                    }
                    const response_json = await res.json();

                    const user = {
                        image: response_json.user_id,
                        name: response_json.username,
                        email: response_json.email,
                    }
                    return user;
                }
        
                return null;
            },
        }),
    ],
});