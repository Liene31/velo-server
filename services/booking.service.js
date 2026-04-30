import { Booking } from "../models/booking.model.js";

export const bookingService = {
  find: async () => {
    try {
      const bookings = await Booking.find();
      return bookings;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  create: async (booking) => {
    try {
      const bookingToAdd = Booking(booking);
      await bookingToAdd.save();
      return bookingToAdd;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
};
