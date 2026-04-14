import { Router } from "express";
import { bikeController } from "../controllers/bike.controller.js";

export const bikeRouter = Router();

bikeRouter.get("/", bikeController.getAll);
