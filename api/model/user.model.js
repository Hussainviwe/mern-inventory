import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    },
    role: {  // Add the role field here
      type: String,
      enum: ["user", "admin"],  // Only allow "user" or "admin" as values
      default: "user",  // Default role is "user"
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
