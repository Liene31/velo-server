import { bikeService } from "../services/bikeService.js";

export const bikeController = {
  getAll: async (req, res) => {
    try {
      const bikes = await bikeService.find();
      const dataToSend = {
        count: bikes.length,
        bikes: bikes,
      };
      res.status(200).json(dataToSend);
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },

  getById: async (req, res) => {
    const id = req.params.id;
    try {
      const bike = await bikeService.findById(id);

      if (!bike) {
        return res
          .status(404)
          .json({ statusCode: 404, message: "Bike not found" });
      }

      res.status(200).json(bike);
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },

  insert: async (req, res) => {
    const bikeToAdd = req.body;

    try {
      const addedBike = await bikeService.create(bikeToAdd);
      res.location(`/api/bikes/${addedBike.id}`);
      res.status(201).json(addedBike);
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },

  updateField: async (req, res) => {
    const id = req.params.id;
    const modification = req.body;

    try {
      const updatedBike = await bikeService.updateField(id, modification);

      if (!updatedBike) {
        return res
          .status(404)
          .json({ statusCode: 404, message: "Bike not found" });
      }

      res.status(200).json(updatedBike);
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },
};
