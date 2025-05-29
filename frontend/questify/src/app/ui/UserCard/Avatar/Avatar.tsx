import { auth } from "@/auth";
import Image from "next/image";
import styles from "./Avatar.module.css";

export default async function Avatar() {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const session = await auth();
    const res = await fetch(`${api}/avatars/${session?.user?.image}`);
    const data = await res.json();

    return (
        <div className={styles.div}>
            {data.background_id && (
                <Image width={256} height={256} className={styles.img}
                    src={`/avatar/backgrounds/background${data.background_id}.png`}
                    alt="User avatar background"/>
            )}
            <Image width={256} height={256} className={styles.img}
                src="/avatar/avatar.png"
                alt="User avatar"/>
            {data.glasses_id && (
                <Image width={256} height={256} className={styles.img}
                    src={`/avatar/glasses/glasses${data.glasses_id}.    png`}
                    alt="User avatar glasses"/>
            )}
            {data.hat_id && (
                <Image width={256} height={256} className={styles.img}
                    src={`/avatar/hats/hat${data.hat_id}.png`}
                    alt="User avatar hat"/>
            )}
            {data.frame_id && (
                <Image width={256} height={256} className={styles.img} priority={true}
                    src={`/avatar/frames/frame${data.frame_id}.png`}
                    alt="User avatar frame"/>
            )}
        </div>
    )
}