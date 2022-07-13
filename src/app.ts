import "dotenv/config";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import userRouter from "./routes/user/user.routes";
import loginRouter from "./routes/user/login.routes";
import { errorHandler } from "./middlewares/express-error.middleware";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", loginRouter);

app.use(errorHandler);

export default app;
