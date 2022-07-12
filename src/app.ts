import express from "express";
import "reflect-metadata";
import { errorHandler } from "./middlewares/express-error.middleware";

const app = express();
app.use(express.json());

app.use(errorHandler)


export default app;
