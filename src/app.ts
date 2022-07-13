import express from "express";
import "reflect-metadata";
import { errorHandler } from "./middlewares/express-error.middleware";
import zoneRoutes from "./routers/zone.routes";

const app = express();

app.use(express.json());

app.use("/zones", zoneRoutes);

app.use(errorHandler);

export default app;
