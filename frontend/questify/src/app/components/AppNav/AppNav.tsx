import Link from "next/link";
import Image from "next/image";
import styles from "./AppNav.module.css";

export default function AppNav() {
    return (
        <nav className={styles.navContainer}>
            <div className={styles.navBar}>
                <Link href="/dashboard" className={styles.navLink}>
                    <div className={styles.navItem}>
                        <Image src="/icons/dashboard.svg" alt="Dashboard" width={24} height={24} className={styles.navIcon} />
                        <span className={styles.navText}>Dashboard</span>
                    </div>
                </Link>
                <Link href="/friends" className={styles.navLink}>
                    <div className={styles.navItem}>
                        <Image src="/icons/friends.svg" alt="Friends" width={24} height={24} className={styles.navIcon} />
                        <span className={styles.navText}>Friends</span>
                    </div>
                </Link>
                <Link href="/customize" className={styles.navLink}>
                    <div className={styles.navItem}>
                        <Image src="/icons/customize.svg" alt="Customize" width={24} height={24} className={styles.navIcon} />
                        <span className={styles.navText}>Customize</span>
                    </div>
                </Link>
                <Link href="/settings" className={styles.navLink}>
                    <div className={styles.navItem}>
                        <Image src="/icons/settings.svg" alt="Settings" width={24} height={24} className={styles.navIcon} />
                        <span className={styles.navText}>Settings</span>
                    </div>
                </Link>
            </div>
        </nav>
    )
}