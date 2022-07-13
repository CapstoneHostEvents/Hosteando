import express from "express";
import "reflect-metadata";
import { errorHandler } from "./middlewares/express-error.middleware";
import { EventRoutes } from "./routes/event.routes";

const app = express();
app.use(express.json());

app.use(errorHandler)

app.use('/event', EventRoutes)

export default app;
