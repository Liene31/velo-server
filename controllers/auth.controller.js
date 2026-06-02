import { authService } from "../services/auth.service.js";
import { jwtUtility } from "./utility/jwt.utility.js";

export const authController = {
  register: async (req, res) => {
    try {
      const userToAdd = req.body;
      const emailExist = await authService.emailExist(userToAdd.email);

      if (emailExist) {
        return res.status(409).json({ message: `Email already exists` });
      }

      const createdUser = await authService.create(userToAdd);
      //res.location(`/api/user/${userCreated._id}`);
      res.status(201).json({
        id: createdUser._id,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },

  login: async (req, res) => {
    try {
      const credentials = req.body;

      const userFound = await authService.findByCredentials(credentials);

      if (!userFound) {
        return res
          .status(401)
          .json({ statusCode: 401, message: "Wrong user details" });
      }

      //on login, takes userFound data and pass to jwt to generate a token
      const token = await jwtUtility.generate(userFound);

      res.status(200).json({
        id: userFound._id,
        name: userFound.name,
        surname: userFound.surname,
        userEmail: userFound.email,
        role: userFound.role,
        token: token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },

  //middleware does already the token check
  //with controller/server I am just getting the user details
  currentUser: async (req, res) => {
    const userId = req.user.id;
    try {
      const userDetails = await authService.findById(userId);
      if (!userDetails) {
        return res
          .status(401)
          .json({ statusCode: 401, message: "No user found" });
      }
      res.status(200).json({
        id: userDetails._id,
        name: userDetails.name,
        userEmail: userDetails.email,
        role: userDetails.role,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },
};
