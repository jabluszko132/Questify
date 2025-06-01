"use client"

export default function DeleteQuestListButton({questlist_id}: {questlist_id: number}) {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const deleteQuestlist = async () => {
        const res = await fetch(`${api}/questlists/${questlist_id}`, { method: "DELETE" });
        if (!res.ok) {
            throw new Error("Failed to delete questlist");
        }
    }

    return <button onClick={deleteQuestlist}>Delete list</button>
}
