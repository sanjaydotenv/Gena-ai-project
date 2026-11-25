import jwt from "jsonwebtoken";
import { _Config } from "../config/config.js";
import { findUserDAO } from "../DAO/auth.dao.js";

export const authenticate = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(404).json({
      message: "access token not found",
    });
  }

  try {
    const decoded = jwt.verify(accessToken, _Config.JWT_ACCESS);

    if (!decoded) {
      res.status(400).json({
        message: "Invalid Token",
      });
    }

    const user = await findUserDAO(decoded.id);

    if (!user) {
      res.status(404).json({
        message: "User not found in db invalid credentials",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
