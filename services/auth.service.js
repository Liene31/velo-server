import { User } from "../models/user.model.js";
import argon2 from "argon2";

export const authService = {
  findByCredentials: async (credentials) => {
    try {
      const userFound = await User.findOne({ email: credentials.email });

      if (!userFound) {
        return false;
      }

      //verifies if password matches
      const passwordCorrect = await argon2.verify(
        userFound.password,
        credentials.password,
      );

      if (!passwordCorrect) {
        return false;
      } else {
        return userFound;
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  findById: async (id) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

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
