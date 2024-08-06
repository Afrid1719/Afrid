"use server";

import { connectDB, disconnectDB } from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
  const { email, password, name } = values;
  try {
    await connectDB();
    // @ts-ignore
    const userFound = await User.findOne({ email });
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      name,
    });
    await user.save();
  } catch (e) {
    console.log(e);
    return {
      error: "Error registering user",
    };
  } finally {
    await disconnectDB();
  }
};
