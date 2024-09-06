import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "@/models/interfaces/i-user";

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid"
      ]
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    username: {
      type: String,
      default: "",
      match: [/^[a-zA-Z0-9_.]+$/, "Username is invalid"]
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User =
  (mongoose.models?.User as mongoose.Model<IUser>) || model("User", UserSchema);

export default User;
