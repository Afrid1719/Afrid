import mongoose, { model, Schema } from "mongoose";
import { IAdmin } from "./interfaces/i-admin";
import bcrypt from "bcryptjs";

export const AdminSchema = new Schema<IAdmin>(
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
    blocked: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

AdminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Admin =
  (mongoose.models?.Admin as mongoose.Model<IAdmin>) ||
  model("Admin", AdminSchema);

export default Admin;
