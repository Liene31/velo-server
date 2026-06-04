import mongoose from "mongoose";
import { User } from "./user.model.js";

const { Schema, model, Types } = mongoose;

const bookingSchema = new Schema(
  {
    bookingDate: {
      type: Date,
      required: true,
    },
    bookingTime: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: User,
      required: true,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  { collection: "Booking", timestamps: true },
);

export const Booking = model("Booking", bookingSchema);
