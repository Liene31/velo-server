import { jwtUtility } from "../controllers/utility/jwt.utility.js";

export const authMiddleware = () => {
  return async (req, res, next) => {
    //frontend sends in the req header token (bearer)
    const authHeader = req.headers.authorization;

    //if no token, needs to connect
    if (!authHeader) {
      return res.status(401).json({
        statusCode: 401,
        message: "Please connect in order to continue ",
      });
    } else {
      //token comes as string "Bearer longToken"
      //split a string into an array of substrings
      //and takes token which is in index 1
      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          statusCode: 401,
          message: "Please connect in order to continue",
        });
      }

      try {
        //takes the token and decodes and returns user.id and user.role and some other info (iat, exp, aud and iss)
        const payload = await jwtUtility.decode(token);

        //creating req.user and assigning what's in payload
        //now req.user is accessible the same way as req.body or req.param
        req.user = payload;

        //since this is a middleware and sits in router before controller
        //if all goes well, next() just says to move to next step which would execute next function
        next();
      } catch (err) {
        return res.status(401).json({
          statusCode: 401,
          message: "Please connect in order to continue",
        });
      }
    }
  };
};
