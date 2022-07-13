import "dotenv/config";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { errorHandler } from "./middlewares/express-error.middleware";
import zoneRoutes from "./routers/Zone/zone.routes";

const app = express();

app.use(express.json());

app.use("/zones", zoneRoutes);

app.use(errorHandler);

export default app;
