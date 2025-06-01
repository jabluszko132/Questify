"use client"

export default function AddQuestListButton({user_id}: {user_id: number}) {
    const api = process.env.NEXT_PUBLIC_API_URL;

    const addQuestList = async () => {
        let title = prompt("Enter questlist title");
        if (!title) {
            return;
        }

        const res = await fetch(`${api}/questlists/`, { method: "POST", body: JSON.stringify({
            "title": title,
            "user_id": user_id
        }), headers: {
            "Content-Type": "application/json"
        }});
        if (!res.ok) {
            throw new Error("Failed to add questlist");
        }
    }

    return <button onClick={addQuestList}>New quest list...</button>
}
