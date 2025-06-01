import UserCard from "@/app/components/UserCard/UserCard";
import QuestListGroup from "@/app/components/QuestListGroup/QuestListGroup";
import { auth } from "@/auth";

export default async function DashboardPage() {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const session = await auth();

    const user_id: number = Number(session?.user?.image);
    const user_name = session?.user?.name || "";

    const stats_res = await fetch(`${api}/stats/${user_id}`);
    const stats_data = await stats_res.json();

    const avatar_res = await fetch(`${api}/avatars/${user_id}`);
    const avatar_data = await avatar_res.json();

    return (
        <div>
            <h1>Dashboard</h1>
            <UserCard user={{id: user_id, name: user_name}} avatar={avatar_data} stats={stats_data}/>
            <QuestListGroup />
        </div>
    )
}