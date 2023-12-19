import * as express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route";
import todoListRouter from "./routes/todolist.route";
import todoRoute from "./routes/todo.route";
import { config } from "dotenv";
import errorHanler from "./utils/errorHanler";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";

config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
mongoose.set("strictQuery", true);
mongoose.set("strictPopulate", false);
mongoose.connect(`${process.env.DB_URL}`);

app.use("/api", userRouter);
app.use("/api", todoListRouter);
app.use("/api", todoRoute);

app.use(errorHanler);
app.listen(process.env.PORT, () => console.log("Hello"));
