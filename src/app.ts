import "dotenv/config";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import userRouter from "./routes/user/user.routes";
import loginRouter from "./routes/user/login.routes";
import ticketRouter from "./routers/Ticket";
import { EventRoutes } from "./routes/event.routes";
import zoneRoutes from "./routers/Zone/zone.routes";
import emailRouter from "./routes/user/email.routes";
import { errorHandler } from "./middlewares/express-error.middleware";

const app = express();

app.use(express.json());

app.use("/tickets", ticketRouter);
app.use("/event", EventRoutes);
app.use("/zones", zoneRoutes);
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/email", emailRouter);

app.use(errorHandler);

export default app;
