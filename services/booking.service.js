import { Booking } from "../models/booking.model.js";

export const bookingService = {
  find: async () => {
    try {
      const bookings = await Booking.find().sort({
        bookingDate: -1,
      });
      return bookings;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  findByUserId: async (id) => {
    try {
      //sorting in descending order -> first newest bookings and then oldest
      const bookings = await Booking.find({ userId: id }).sort({
        bookingDate: -1,
      });
      return bookings;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  //find and returns only selected two fields
  findSlots: async () => {
    try {
      const bookings = await Booking.find().select("bookingDate bookingTime");
      return bookings;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  create: async (booking) => {
    try {
      const bookingToAdd = Booking(booking);
      await bookingToAdd.save();
      return bookingToAdd;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  updateField: async (id, modification) => {
    try {
      const modifiedField = await Booking.findByIdAndUpdate(id, modification, {
        //returns updated document to the old version
        returnDocument: "after",
        //validates in my booking schema if I am using one of the statuses indicated in enum
        runValidators: true,
      });

      return modifiedField;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
