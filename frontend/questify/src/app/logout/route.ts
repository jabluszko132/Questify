import { signOut } from "@/auth";

export async function GET() {
    'use server';
    await signOut({ redirectTo: '/' });
}