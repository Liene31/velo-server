import { Bike } from "../models/bike.model.js";

export const bikeService = {
  find: async () => {
    try {
      const bikes = await Bike.find();
      return bikes;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  findById: async (id) => {
    try {
      const bike = await Bike.findById(id);
      //   console.log(bike);
      return bike;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  create: async (bike) => {
    try {
      const bikeToAdd = Bike(bike);
      await bikeToAdd.save();
      return bikeToAdd;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  updateField: async (id, modification) => {
    try {
      const modifiedField = await Bike.findByIdAndUpdate(
        id,
        {
          $set: modification,
        },
        {
          returnDocument: "after",
        },
      );
      return modifiedField;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  delete: async (id) => {
    try {
      const bikeToDelete = await Bike.findByIdAndDelete(id);
      if (bikeToDelete) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(err);
    }
  },
};
