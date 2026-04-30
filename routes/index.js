import { Router } from "express";
import { bikeRouter } from "./bike.router.js";
import { authRouter } from "./auth.router.js";
import { bookingRouter } from "./booking.router.js";

export const router = Router();

router.use("/bikes", bikeRouter);
router.use("/auth", authRouter);
router.use("/booking", bookingRouter);
