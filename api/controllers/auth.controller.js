import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res , next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next (errorHandler(400, "All fields are required"));
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  const user = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await user.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};


