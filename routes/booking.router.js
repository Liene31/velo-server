import { Router } from "express";
import { bookingController } from "../controllers/booking.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const bookingRouter = Router();

bookingRouter.get("/", authMiddleware(), bookingController.getAll);
bookingRouter.get("/slots", bookingController.getSlots);
bookingRouter.get("/:id", authMiddleware(), bookingController.getById);

bookingRouter.post("/", authMiddleware(), bookingController.insert);

bookingRouter.patch("/:id", authMiddleware(), bookingController.updateStatus);
