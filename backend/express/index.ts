import express from 'express';
import { avatarRouter } from './routers/avatars'
import {usersRouter} from "./routers/users";

const app = express();
app.use(express.json());

app.use("/avatars", avatarRouter);
app.use("/users", usersRouter);

app.listen(3000);
console.log("App listening on port http://localhost:3000/");
