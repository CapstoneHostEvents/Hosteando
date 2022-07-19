import "dotenv/config";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import userRouter from "./routes/user/user.routes";
import loginRouter from "./routes/user/login.routes";
import ticketRouter from "./routes/ticket/ticket.routes";
import zoneRoutes from "./routes/zone/zone.routes";
import emailRouter from "./routes/user/email.routes";
import { errorHandler } from "./middlewares/express-error.middleware";
import eventRoutes from "./routes/event/event.routes";

const app = express();

app.use(express.json());

app.use("/tickets", ticketRouter);
app.use("/events", eventRoutes);
app.use("/zones", zoneRoutes);
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/email", emailRouter);

app.use(errorHandler);

export default app;
