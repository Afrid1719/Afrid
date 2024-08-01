"use server";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
  const { email, password, name } = values;
  try {
    await connectDB();
    const userFound = await User.findOne<{ email: String }>({ email });
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
    const savedUser = await user.save();
  } catch (e) {
    console.log(e);
  }
};
