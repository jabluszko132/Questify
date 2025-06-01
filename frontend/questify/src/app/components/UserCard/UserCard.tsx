'use client'
import Avatar from "./Avatar/Avatar";
import styles from "./UserCard.module.css";

export default function UserCard({user, avatar, stats}: {
    user: {id: number, name?: string},
    avatar?: {background_id?: number, glasses_id?: number, hat_id?: number, frame_id?: number},
    stats: {exp?: number, coins?: number}})
{
    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <Avatar avatar={avatar} />
                <div className={styles.info}>
                    <p className={styles.name}>{user.name || "User"}</p>
                    <p className={styles.details}>Level {Math.floor((stats.exp || 0)/10)}</p>
                    <p className={styles.details}>{stats.coins || 0} coins</p>
                </div>
            </div>
        </div>
    )
}