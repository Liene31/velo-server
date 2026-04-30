import { bookingService } from "../services/booking.service.js";

export const bookingController = {
  getAll: async (req, res) => {
    try {
      const bookings = await bookingService.find();
      const dataToSend = {
        count: bookings.length,
        bookings: bookings,
      };
      res.status(200).json(dataToSend);
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },

  insert: async (req, res) => {
    const bookingToAdd = req.body;

    try {
      const addedBooking = await bookingService.create(bookingToAdd);
      res.location(`/api/bookings/${addedBooking.id}`);
      res.status(201).json(addedBooking);
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },
};
