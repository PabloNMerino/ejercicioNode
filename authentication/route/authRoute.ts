import express from "express";
import { authController } from "../controller/authController";
import { config } from "dotenv";

const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);

export default authRouter;