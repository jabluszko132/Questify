import express from 'express';
import getModelCRUDRouter, {CRUDRouterConfig} from "./routers/modelCRUDRouter";
import {
    AttributeReq,
    AvatarsReq,
    AvatarsSchema,
    FriendsSchema, QuestDetailsSchema, QuestlistsSchema, QuestsSchema,
    StatsSchema, FriendsReq,
    UsersQuestlistsSchema,
    UsersReq
} from "./models";
import prisma from "./dbCon";
import friendsRouter from "./routers/friendsRouter";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const usersConfig: CRUDRouterConfig = {
    idName: 'id',
    updateModel: UsersReq,
    createModel: UsersReq
}
const avatarsConfig: CRUDRouterConfig = {
    idName: 'user_id',
    updateModel: AvatarsReq,
    createModel: AvatarsSchema
}
const attributeConfig: CRUDRouterConfig = {
    idName: 'id',
    updateModel: AttributeReq,
    createModel: AttributeReq
}
const friendsConfig: CRUDRouterConfig = {
    idName: 'user1_id',
    updateModel: FriendsReq,
    createModel: FriendsSchema
}
const usersQuestlistsConfig: CRUDRouterConfig = {
    idName: 'user_id',
    updateModel: UsersQuestlistsSchema,
    createModel: UsersQuestlistsSchema
}
const statsConfig: CRUDRouterConfig = {
    idName: 'user_id',
    updateModel: StatsSchema,
    createModel: StatsSchema
}
const questsConfig: CRUDRouterConfig = {
    idName: 'id',
    updateModel: QuestsSchema,
    createModel: QuestsSchema
}
const questlistsConfig: CRUDRouterConfig = {
    idName: 'id',
    updateModel: QuestlistsSchema,
    createModel: QuestlistsSchema
}
const questDetailsConfig: CRUDRouterConfig = {
    idName: 'id',
    updateModel: QuestDetailsSchema,
    createModel: QuestDetailsSchema
}

app.use("/users", getModelCRUDRouter(prisma.users, usersConfig));
app.use("/avatars", getModelCRUDRouter(prisma.avatars, avatarsConfig));
app.use("/hats", getModelCRUDRouter(prisma.hats,attributeConfig));
app.use("/backgrounds", getModelCRUDRouter(prisma.backgrounds, attributeConfig));
app.use("/frames", getModelCRUDRouter(prisma.frames, attributeConfig));
app.use("/glasses", getModelCRUDRouter(prisma.glasses, attributeConfig));
app.use("/friends", friendsRouter);
app.use("/users_questlists", getModelCRUDRouter(prisma.users_questlists, usersQuestlistsConfig));
app.use("/stats", getModelCRUDRouter(prisma.stats, statsConfig));
app.use("/quests", getModelCRUDRouter(prisma.quests, questsConfig));
app.use("/questlists", getModelCRUDRouter(prisma.questlists, questlistsConfig));
app.use("/questlist_details", getModelCRUDRouter(prisma.quest_details, questDetailsConfig));


app.listen(3000);
console.log("App listening on port http://localhost:3000/");
