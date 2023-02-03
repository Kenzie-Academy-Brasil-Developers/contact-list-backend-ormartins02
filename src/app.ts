import express from "express";
import { userRoutes } from "./Routes/user.Routes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes)