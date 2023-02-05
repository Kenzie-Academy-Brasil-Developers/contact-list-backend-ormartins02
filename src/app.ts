import express from "express";
import { contactRoutes } from "./Routes/contact.Routes";
import { userRoutes } from "./Routes/user.Routes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes)
app.use("/contacts", contactRoutes)

export default app;
