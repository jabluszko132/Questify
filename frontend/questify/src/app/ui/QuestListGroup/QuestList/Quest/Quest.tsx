import CompleteQuestButton from "../CompleteQuestButton/CompleteQuestButton";
import DeleteQuestButton from "../DeleteQuestButton/DeleteQuestButton";
import styles from "../QuestList.module.css";

export default async function Quest({quest_id}: {quest_id: number}) {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${api}/quest_details/${quest_id}`);
    const data = await res.json();
    return (
        <div className={styles.quest}>
            <p className={styles.questDescription}>{data.description}</p>
            <CompleteQuestButton quest_id={quest_id}/>
            <DeleteQuestButton quest_id={quest_id}/>
        </div>
    )
}