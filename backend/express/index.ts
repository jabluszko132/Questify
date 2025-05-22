import express from 'express';
import { avatarRouter } from './routers/avatars'
import {usersRouter} from "./routers/users";
import {hatsRouter} from "./routers/hats";
import {backgroundsRouter} from "./routers/backgrounds";
import {glassesRouter} from "./routers/glasses";
import {framesRouter} from "./routers/frames";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/avatars", avatarRouter);
app.use("/users", usersRouter);
app.use("/hats", hatsRouter);
app.use("/backgrounds", backgroundsRouter);
app.use("/frames", framesRouter);
app.use("/glasses", glassesRouter);

app.listen(3000);
console.log("App listening on port http://localhost:3000/");
