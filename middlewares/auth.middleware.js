import { jwtUtility } from "../controllers/utility/jwt.utility.js";

export const authMiddleware = () => {
  return async (req, res, next) => {
    //frontend sends in the req header token
    const authorization = req.header.authorization;

    if (!authorization) {
      res.status(401).json({
        statusCode: 401,
        message: "Please connect in order to continue ",
      });
    } else {
      console.log(authorization);
      const token = authorization.split(" ")[1];
      console.log(token);

      if (!token) {
        res.status(401).json({
          statusCode: 401,
          message: "Please connect in order to continue",
        });
      }

      try {
        const payload = await jwtUtility.decode(token);

        //creating req.user and assigning what's in payload
        //now req.user is accessible the same way as req.body or req.param
        req.user = payload;
        console.log(payload);

        //since this is a middleware and sits in router before controller
        //if all goes well, next() just says to move to next step which would execute next function
        next();
      } catch (err) {
        res.status(401).json({
          statusCode: 401,
          message: "Please connect in order to continue",
        });
      }
    }
  };
};
