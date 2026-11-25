import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

/**
 * @args { name , email , hashedPassword }
 * @description save a user in db
 */

export const createUserDAO = async (name, email, password) => {
  try {
    return await userModel.create({
      name,
      email,
      password,
    });
  } catch (error) {
    console.log(`Error while save data in db`);
  }
};

/**
 * @args { email , password }
 * @description find a user in db o the bases of email
 */

export const loginUserDAO = async (email, password) => {
  const user = await userModel.findOne({ email });

  const isValidPass = await bcrypt.compare(password, user.password);

  if (!isValidPass) {
    throw new Error("Invalid Credentials");
  }

  return user;
};
