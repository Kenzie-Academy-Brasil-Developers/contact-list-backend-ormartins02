import "express-async-errors";
import "reflect-metadata";
import express from "express";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import { contactRoutes } from "./Routes/contact.Routes";
import { sessionRoutes } from "./Routes/session.routes";
import { userRoutes } from "./Routes/user.Routes";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors())

app.use("/users", userRoutes)
app.use("/session", sessionRoutes)
app.use("/contacts", contactRoutes)
app.use(handleErrorMiddleware);

export default app;
