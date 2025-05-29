"use client"

import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const api = process.env.NEXT_PUBLIC_API_URL;
    function register(formData: FormData)
    {
        fetch(`${api}/users`, {method: "POST", body: JSON.stringify({
            "username": formData.get("username"),
            "email": formData.get("email"),
            "password": formData.get("password")
        }), headers: {
            "Content-Type": "application/json"
        }}).then(res => {
            if (res.ok) {
                alert("User registered successfully. Redirecting to login page...");
                router.push(`${host}/login`)
            } else {
                alert(`Error: ${res.status} ${res.statusText}`);
            }
        }).catch(err => {
            alert("Error");
        })
    }
    return (
        <div>
            <h1>Register</h1>
            <form action={register}>
            {/* <form action={`${api}/users`} method="post"> */}

                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username"
                    placeholder="Enter username" required minLength={1} />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email"
                    placeholder="Enter email" required minLength={1} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"
                    placeholder="Enter password" required minLength={1} />

                <button type="submit">Register</button>
                
            </form>
        </div>
    )
}