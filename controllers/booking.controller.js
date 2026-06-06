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

  getById: async (req, res) => {
    const userId = req.params.id;
    try {
      const bookings = await bookingService.findByUserId(userId);
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

  updateStatus: async (req, res) => {
    const id = req.params.id;
    const modification = req.body;

    try {
      const updatedStatus = await bookingService.updateField(id, modification);

      if (!updatedStatus) {
        return res
          .status(404)
          .json({ statusCode: 404, message: "Booking not found" });
      }

      res.status(200).json(updatedStatus);
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },
};
