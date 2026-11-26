import express from "express";
import authRoutes from "../src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import chatRoutes from "../src/routes/chat.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

export default app;
