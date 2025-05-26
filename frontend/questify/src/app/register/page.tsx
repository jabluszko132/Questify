export default function RegisterPage() {
    return (
        <div>
            <h1>Register</h1>
            <form action="http://localhost:3000/users" method="post">

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