import { auth } from "@/auth";
import QuestList from "./QuestList/QuestList";
import AddQuestListButton from "./AddQuestListButton/AddQuestListButton";

export default async function QuestListGroup() {
    const session = await auth();
    const user_id: number = Number(session?.user?.image);

    const api = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${api}/users_questlists/${user_id}`);
    const data = await res.json();
    return (
        <div>
            <h1>Your Quest Lists:</h1>
            <div>
                {Array.isArray(data) && data.map((item: { questlist_id: number }) => (
                    <QuestList key={item.questlist_id} questlist_id={item.questlist_id} />
                ))}
            </div>
            <AddQuestListButton user_id={user_id}/>
        </div>
    )
}