import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    role: { type: [String], default: ["manager"] },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models?.users || mongoose.model("users", userSchema);

export default UserModel;
