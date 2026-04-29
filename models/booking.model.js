import mongoose from "mongoose";

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
  },
  { collection: "Booking", timestamps: true },
);

export const Booking = model("Booking", bookingSchema);
