import Avatar from "./Avatar/Avatar";
import { auth } from "@/auth";
import styles from "./UserCard.module.css";

export default async function UserCard() {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const session = await auth();
    const res = await fetch(`${api}/stats/${session?.user?.image}`);
    const data = await res.json();
    
    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <Avatar />
                <div className={styles.info}>
                    <p className={styles.name}>{session?.user?.name}</p>
                    <p className={styles.details}>Level {Math.floor(data.exp/10)}</p>
                    <p className={styles.details}>{data.coins} coins</p>
                </div>
            </div>
        </div>
    )
}