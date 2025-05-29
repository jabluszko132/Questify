"use client"

// export default function AddQuestButton({questlist_id, setQuestArray}: {questlist_id: number, setQuestArray: React.Dispatch<React.SetStateAction<any>>}) {
export default function AddQuestButton({questlist_id}: {questlist_id: number}) {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const addQuest = async () => {
            let description = prompt("Enter quest description");
            if (!description) {
                return;
            }
    
            const res = await fetch(`${api}/quests/`, { method: "POST", body: JSON.stringify({
                "description": description,
                "questlist_id": questlist_id
            }), headers: {
                "Content-Type": "application/json"
            }});
            if (!res.ok) {
                throw new Error("Failed to add quest");
            }
    }
    return <button onClick={addQuest}>Add Quest</button>
}