import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String,
      lowercase: true,
      unique: true,
    },
    name: String,
    gender: String,
    dob: Date,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
