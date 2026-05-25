import { Bike } from "../models/bike.model.js";

export const bikeService = {
  find: async (query) => {
    const tag = query.tag;

    let tagFilter;

    if (tag === undefined || tag === "all") {
      tagFilter = {};
    } else {
      //this is how tags are in my bike model
      tagFilter = { tags: tag };
    }

    try {
      //Mongoose checks the tags field of each bike document and returns documents where that value exists in the array.
      const bikes = await Bike.find(tagFilter);
      return bikes;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  findById: async (id) => {
    try {
      const bike = await Bike.findById(id);
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

  update: async (id, modification) => {
    try {
      const updatedBike = await Bike.findByIdAndUpdate(id, modification, {
        returnDocument: "after",
      });

      return updatedBike;
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
