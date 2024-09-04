"use server";

import { connectDB, disconnectDB } from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (
  values: Record<"name" | "email" | "password", string>
) => {
  const { email, password, name } = values;
  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound) {
      throw new Error("Email already exists!");
    }
    const user = new User({
      email,
      password,
      name
    });
    await user.save();
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    await disconnectDB();
  }
};
