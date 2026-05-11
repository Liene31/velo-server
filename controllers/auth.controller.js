import { authService } from "../services/auth.service.js";

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
      res.status(200).json({
        id: userFound._id,
        firstName: userFound.firstName,
        userEmail: userFound.email,
        role: userFound.role,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },
};
