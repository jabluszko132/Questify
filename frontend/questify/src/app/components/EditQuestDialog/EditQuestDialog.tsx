import {FormEvent, useEffect, useState, useRef} from "react";
interface QuestData {
    description: string;
    completed: boolean;
}

export default function EditQuestDialog(props: {quest_id: number, questData: QuestData, isOpen: boolean}) {
    const [description, setDescription] = useState(props.questData.description);
    const [completed, setCompleted] = useState(props.questData.completed);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if(dialogRef){
            if(props.isOpen){
                dialogRef.current?.show();
            }else{
               dialogRef.current?.close();
            }
        }
    }, [dialogRef, props.isOpen]);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(!dialogRef.current) return;
        if(dialogRef.current?.returnValue in ["cancel", "default"]) {
            dialogRef.current?.close();
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
                dialogRef.current?.close();
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
        <dialog ref={dialogRef}>
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