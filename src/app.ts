import "express-async-errors";
import "dotenv/config";
import express from "express";
import "reflect-metadata";
import { errorHandler } from "./middlewares/express-error.middleware";
import { EventRoutes } from "./routes/event.routes";

const app = express();
app.use(express.json());

app.use('/event', EventRoutes)

app.use(errorHandler)

export default app;
