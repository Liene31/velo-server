import { User } from "../models/user.model.js";

export const authService = {
  emailExist: async (email) => {
    try {
      const userFound = await User.findOne({ email });
      if (userFound) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  create: async (user) => {
    try {
      //hashed password to add
      const userToCreate = User(user);
      await userToCreate.save();
      return userToCreate;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
};
