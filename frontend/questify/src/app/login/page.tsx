"use client"

import Link from "next/link";
import { useActionState } from 'react';
import { authenticate } from '@/app/actions';
import { useSearchParams } from 'next/navigation';


export default function LoginPage() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );
    return (
        <div>
            <h1>Login</h1>
            <form action={formAction}>

                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username"
                    placeholder="Enter username" required minLength={1} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"
                    placeholder="Enter password" required minLength={1} />

                <input type="hidden" name="redirectTo" value={callbackUrl} />

                <button type="submit" aria-disabled={isPending}>Login</button>
            </form>
            <p>Don&apos;t have an account yet? Register <Link href="/register">here</Link>.</p>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}