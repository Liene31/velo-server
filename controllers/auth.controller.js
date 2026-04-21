import { authService } from "../services/auth.service";

export const authController = {
  register: async (req, res) => {
    try {
      const userToAdd = req.body;
      const emailExist = await authService.emailExist(userToAdd.email);
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },

  login: (req, res) => {
    res.sendStatus(200);
  },
};
