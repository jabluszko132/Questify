import {FormEvent, RefObject, useState} from "react";
interface QuestData {
    description: string;
    completed: boolean;
}

export default function EditQuestDialog(props: {quest_id: number, questData: QuestData, dialogRef: RefObject<HTMLDialogElement>}) {
    const [description, setDescription] = useState(props.questData.description);
    const [completed, setCompleted] = useState(props.questData.completed);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(props.dialogRef.current.returnValue in ["cancel", "default"]) {
            props.dialogRef.current.close();
            return;
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/quest_details/${props.quest_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: props.quest_id,
                description: description,
                completed: completed,
            }),
        }).then(res => {
            if (res.ok){
                alert("Quest successfully updated.");
                props.dialogRef.current.close();
            } else {
                alert("Failed to update the quest.");
                console.error("Failed to update quest: ", res.statusText);
            }
        }).catch(err => {
            alert("Failed to update the quest.");
            console.error("Error updating quest: ", err);
        });
    }

    return (
        <dialog ref={props.dialogRef}>
            <h2>Edit Quest</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Description:
                    <input type="text" name="description" value={description} onChange={v => setDescription(v.target.value)} />
                </label>
                <br />
                <label>
                    Completed:
                    <input type="checkbox" name="completed" checked={completed} onChange={() => setCompleted(!completed)} />
                </label>
                <button type="submit" formMethod="dialog">Save</button>
                <button type="button">Cancel</button>
            </form>
        </dialog>
    )
}