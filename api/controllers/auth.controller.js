import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ error: "All fields are required" });
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
    res.status(500).json({ message: "error.message" });
  }
};