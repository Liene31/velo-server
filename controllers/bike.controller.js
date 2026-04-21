import { bikeService } from "../services/bikeService.js";
import { flatten } from "../utils/flatten.js";

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
    //transforms the data received from front in dot notation
    const flattenModification = flatten(modification);

    console.log(flattenModification);

    try {
      const updatedBike = await bikeService.updateField(
        id,
        flattenModification,
      );

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

  delete: async (req, res) => {
    const id = req.params.id;

    try {
      const isDeleted = await bikeService.delete(id);

      if (isDeleted) {
        res.sendStatus(204);
      } else {
        res.status(404).json({
          statusCode: 404,
          message: "Not possible to delete, the bike doesn't exist",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },
};
