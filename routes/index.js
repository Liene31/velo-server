import { Router } from "express";
import { bikeRouter } from "./bike.router.js";

export const router = Router();

router.use("/bikes", bikeRouter);
