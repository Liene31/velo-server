import { Router } from "express";
import { bikeController } from "../controllers/bike.controller.js";

export const bikeRouter = Router();

bikeRouter.get("/", bikeController.getAll);
bikeRouter.get("/:id", bikeController.getById);

bikeRouter.post("/", bikeController.insert);

bikeRouter.put("/:id", bikeController.update);

bikeRouter.patch("/:id", bikeController.updateField);

bikeRouter.delete("/:id", bikeController.delete);
