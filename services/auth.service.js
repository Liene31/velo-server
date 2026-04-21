import { User } from "../models/user.model.js";
import argon2 from "argon2";

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
      const hashedPassword = await argon2.hash(user.password);
      user.password = hashedPassword;
      const userToCreate = User(user);
      await userToCreate.save();
      return userToCreate;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
};
