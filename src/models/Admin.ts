import bcrypt from "bcryptjs";
import mongoose, { model, Schema } from "mongoose";
import { IAdmin } from "@/interfaces/i-admin";
import { connectDB, disconnectDB } from "@/lib/mongo";

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

/******* ADMIN FUNCTIONS */

export async function createAdmin(data: IAdmin) {
  try {
    await connectDB();
    const adminExists = await Admin.findOne({ email: data.email });
    if (adminExists) {
      throw new Error("Admin already exists");
    }
    const admin = new Admin(data);
    await admin.save();
    return {
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name
    };
  } catch (error) {
    throw error;
  } finally {
    await disconnectDB();
  }
}

export async function getAllAdmins() {
  try {
    await connectDB();
    const admins = await Admin.find();
    return admins.map((admin) => ({
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name
    }));
  } catch (error) {
    throw error;
  } finally {
    await disconnectDB();
  }
}

export async function getAdminByEmailOrId(
  query: string
): Promise<Omit<IAdmin, "password"> | null> {
  try {
    await connectDB();
    const admin = await Admin.findOne({
      $or: [{ email: query }, { _id: query }]
    });
    return admin
      ? {
          id: admin._id.toString(),
          email: admin.email,
          name: admin.name,
          blocked: admin.blocked
        }
      : null;
  } catch (error) {
    throw error;
  } finally {
    await disconnectDB();
  }
}
