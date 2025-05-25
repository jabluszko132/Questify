import styles from "./landingPageNav.module.css";
import Link from "next/link";

export default function LandingPageNav() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.link}>
        Home
      </Link>
      <Link href="/login" className={styles.link}>
        Login
      </Link>
      <Link href="/register" className={styles.link}>
        Register
      </Link>
      <Link href="/about" className={styles.link}>
        About us
      </Link>
      <Link href="/contact" className={styles.link}>
        Contact
      </Link>
    </nav>
  );
}
