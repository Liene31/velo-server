import { Router } from "express";
import { bikeController } from "../controllers/bike.controller.js";

export const bikeRouter = Router();

bikeRouter.get("/", bikeController.getAll);
bikeRouter.get("/:id", bikeController.getById);

bikeRouter.post("/", bikeController.insert);

bikeRouter.patch("/:id", bikeController.updateField);
