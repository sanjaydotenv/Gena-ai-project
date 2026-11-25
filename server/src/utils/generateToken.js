import jwt from "jsonwebtoken";
import { _Config } from "../config/config.js";

/**
 *
 */
export const generateAccessAndRefreshToken = (userId, email) => {
  const accessToken = jwt.sign(
    {
      id: userId,
      email,
    },
    _Config.JWT_ACCESS, {expiresIn: "15m"}
  );

  const refreshToken = jwt.sign(
    {
      id: userId,
      email,
    },
    _Config.JWT_REFRESH, {expiresIn: "7d"}
  );

  return { accessToken, refreshToken };
};
