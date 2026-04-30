import { Router } from "express";
import { bookingController } from "../controllers/booking.controller.js";

export const bookingRouter = Router();

bookingRouter.get("/", bookingController.getAll);

bookingRouter.post("/", bookingController.insert);
