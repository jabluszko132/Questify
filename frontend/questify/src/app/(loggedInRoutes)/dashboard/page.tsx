import UserCard from "@/app/components/UserCard/UserCard";
import QuestListGroup from "@/app/components/QuestListGroup/QuestListGroup";

export default async function DashboardPage() {
    return (
        <div>
            <h1>Dashboard</h1>
            <UserCard />
            <QuestListGroup />
        </div>
    )
}