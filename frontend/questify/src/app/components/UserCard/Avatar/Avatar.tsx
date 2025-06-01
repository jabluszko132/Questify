'use client'

import Image from "next/image";
import styles from "./Avatar.module.css";

export default function Avatar({avatar}: {avatar?: {background_id?: number, glasses_id?: number, hat_id?: number, frame_id?: number}}) {

    return (
        <div className={styles.div}>
            {avatar?.background_id && (
                <Image width={256} height={256} className={styles.img}
                    src={`/avatar/backgrounds/background${avatar.background_id}.png`}
                    alt="User avatar background"/>
            )}
            <Image width={256} height={256} className={styles.img}
                src="/avatar/avatar.png"
                alt="User avatar"/>
            {avatar?.glasses_id && (
                <Image width={256} height={256} className={styles.img}
                    src={`/avatar/glasses/glasses${avatar.glasses_id}.png`}
                    alt="User avatar glasses"/>
            )}
            {avatar?.hat_id && (
                <Image width={256} height={256} className={styles.img}
                    src={`/avatar/hats/hat${avatar.hat_id}.png`}
                    alt="User avatar hat"/>
            )}
            {avatar?.frame_id && (
                <Image width={256} height={256} className={styles.img} priority={true}
                    src={`/avatar/frames/frame${avatar.frame_id}.png`}
                    alt="User avatar frame"/>
            )}
        </div>
    )
}