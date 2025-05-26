import styles from "./landingPageNav.module.css";
import Link from "next/link";

import Image from "next/image";
import { auth } from "@/auth";

export default async function LandingPageNav() {
  const session = await auth();
  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Questify Logo"
            width={48}
            height={48}
            className={styles.logo}
            priority
          />
        </Link>
      </div>
      <div className={styles.links}>
        <Link href="/" className={styles.link}>
          Home
        </Link>        
        <Link href="/about" className={styles.link}>
          About us
        </Link>
        <Link href="/contact" className={styles.link}>
          Contact
        </Link>
        {(!session?.user)
        ? (<>
          <Link href="/register" className={styles.link}>
            Register
          </Link>
          <Link href="/login" className={styles.link}>
            Login
          </Link>
          </>
        )
        : (
          <Link href="/logout" className={styles.link}>
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
}
