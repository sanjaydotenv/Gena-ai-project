import bcrypt from "bcrypt";
import { createUserDAO, loginUserDAO } from "../DAO/auth.dao.js";
import { generateAccessAndRefreshToken } from "../utils/generateToken.js";

const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await createUserDAO(name, email, hashedPassword);

  res.status(201).json({
    message: "User Created Successfully ",
    user,
  });
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUserDAO(email, password);

  const { accessToken, refreshToken } = generateAccessAndRefreshToken(
    user._id,
    user.email,
  );

  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({
    message: "User Logged Suucessfully",
    data: {
      accessToken,
      user,
    },
  });
};

export default { registerUserController, loginUserController };
