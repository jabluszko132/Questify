import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/logo.png"
          alt="Questify logo"
          width={180}
          height={180}
          priority
        />
        <h1>Questify</h1>
      </main>
      <footer>
      </footer>
    </div>
  );
}
