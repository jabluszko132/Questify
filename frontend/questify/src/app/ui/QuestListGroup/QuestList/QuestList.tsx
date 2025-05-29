import Quest from "./Quest/Quest";
import AddQuestButton from "./AddQuestButton/AddQuestButton";
import DeleteQuestListButton from "../DeleteQuestListButton/DeleteQuestListButton";
import styles from "./QuestList.module.css";
// import { useState } from "react";

export default async function QuestList({questlist_id}: {questlist_id: number}) {
    // const [questArray, setQuestArray] = useState<number[]>([]);

    const api = process.env.NEXT_PUBLIC_API_URL;

    const questlist_res = await fetch(`${api}/questlists/${questlist_id}`);
    const questlist_data = await questlist_res.json();

    const quests_res = await fetch(`${api}/quests/${questlist_id}`);
    const quests_data = await quests_res.json();
    console.log("quests_data: ", quests_data);
    let quests_ids: number[] = [];
    if (Array.isArray(quests_data)) {
        quests_ids = quests_data.map((item: { id: number }) => item.id);
    }
    
    // setQuestArray(quests_data.map((item: { id: number }) => item.id));
    
    return (
        <div className={styles.card}>
            <h1 className={styles.title}>{questlist_data.title}</h1>
            <div className={styles.questsContainer}>
                {quests_ids.length > 0 ? (
                    quests_ids.map((quest_id: number) => (
                        <Quest key={quest_id} quest_id={quest_id} />
                    ))
                ) : (
                    <p className={styles.questDescription}>No quests yet. Add one below!</p>
                )}
            </div>
            <div className={styles.buttonContainer}>
                <AddQuestButton questlist_id={questlist_id}/>
                {/* <AddQuestButton questlist_id={questlist_id} setQuestArray={setQuestArray}/> */}
                <DeleteQuestListButton questlist_id={questlist_id}/>
            </div>
        </div>
    )
}