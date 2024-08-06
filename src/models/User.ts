import mongoose, { Schema, model } from "mongoose";
import { UserDocument } from "@/models/interfaces/i-user";

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      default: "",
      match: [/^[a-zA-Z0-9_.]+$/, "Username is invalid"],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models?.User || model("User", UserSchema);

export default User;
