import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

//current-user checks in global scope after the page refresh in front-end if the token is valid
authRouter.get("/current-user", authMiddleware(), authController.currentUser);
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
