import UserCard from "@/app/ui/UserCard/UserCard";
import QuestListGroup from "@/app/ui/QuestListGroup/QuestListGroup";

export default async function DashboardPage() {
    return (
        <div>
            <h1>Dashboard</h1>
            <UserCard />
            <QuestListGroup />
        </div>
    )
}