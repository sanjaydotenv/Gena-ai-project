import bcrypt from "bcrypt";
import { createUserDAO, loginUserDAO } from "../DAO/auth.dao.js";
import { generateAccessAndRefreshToken } from "../utils/generateToken.js";

/**
 * @POST
 * @body { name , email , password }
 * @description Create an new user in DB with hashedPassword
 */

const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await createUserDAO(name, email, hashedPassword);

  res.status(201).json({
    message: "User Created Successfully ",
    user,
  });
};

/**
 * @POST
 * @body { email , password }
 * @description Find an user in db on the basis of email and match the password
 */

const loginUserController = async (req, res) => {
  try {
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
        user,
        accessToken,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @POST
 * @body { empty }
 * @headers { accessToken }
 * @description first check user authenticated or not how? require accessToken in body, remove the cookie in client side, and logout
 */

const logoutUserController = async (req, res) => {
  res.cookie("refreshToken");

  res.status(200).json({
    message: "User Logged Out suuccessfully",
  });
};

/**
 * @GET
 * @body { empty }
 * @headers { accessToken }
 * @description first check user authenticated or not than return user information
 */

const getMeUserController = async (req, res) => {
  const user = req.user;

  return res.status(200).json({
    message: "fetch user profile successfully",
    user,
  });
};

export default { registerUserController, loginUserController, logoutUserController , getMeUserController };
