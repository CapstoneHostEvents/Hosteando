import "dotenv/config";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import userRouter from "./routes/user/user.routes";
import loginRouter from "./routes/user/login.routes";
import { errorHandler } from "./middlewares/express-error.middleware";
import ticketRouter from "./routers/Ticket";
import { EventRoutes } from "./routes/event.routes";
import zoneRoutes from "./routers/Zone/zone.routes";

const app = express();

app.use(express.json());

app.use('/tickets', ticketRouter);
app.use('/event', EventRoutes)
app.use("/zones", zoneRoutes);
app.use("/users", userRouter);
app.use("/login", loginRouter);

app.use(errorHandler);

export default app;
