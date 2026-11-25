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
    _Config.JWT_ACCESS,
  );

  const refreshToken = jwt.sign(
    {
      id: userId,
      email,
    },
    _Config.JWT_REFRESH,
  );

  return { accessToken, refreshToken };
};
