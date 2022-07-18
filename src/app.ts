import "dotenv/config";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { errorHandler } from "./middlewares/express-error.middleware";
import { eventRoutes } from "./routes/event/event.routes";
import ticketRouter from "./routes/ticket/tickets.routes";
import loginRouter from "./routes/user/login.routes";
import userRouter from "./routes/user/user.routes";
import zoneRoutes from "./routes/zone/zone.routes";

const app = express();

app.use(express.json());

app.use("/tickets", ticketRouter);
app.use("/events", eventRoutes);
app.use("/zones", zoneRoutes);
app.use("/users", userRouter);
app.use("/login", loginRouter);

app.use(errorHandler);

export default app;
