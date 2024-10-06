import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "@/interfaces/i-user";
import { connectDB } from "@/lib/mongo";

const projection = "-password -__v -updatedAt -createdAt";
const queryOptions = { lean: true };

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

/******* USER FUNCTIONS ***********/

export async function getUserByEmailOrId(query: string) {
  try {
    await connectDB();
    let isObjectId = mongoose.Types.ObjectId.isValid(query);
    const user = isObjectId
      ? await User.findOne({ _id: query }, projection, queryOptions)
      : await User.findOne({ email: query }, projection, queryOptions);
    user.id = user._id.toString();
    delete user._id;
    return user || null;
  } catch (error) {
    throw error;
  }
}
