import { Router } from "express";
import { bookingController } from "../controllers/booking.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const bookingRouter = Router();

bookingRouter.get("/", bookingController.getAll);
bookingRouter.get("/:id", bookingController.getById);

bookingRouter.post("/", authMiddleware(), bookingController.insert);
