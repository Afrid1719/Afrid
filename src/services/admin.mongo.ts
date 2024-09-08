import { IAdminRequest } from "@/interfaces/i-admin";
import { connectDB, disconnectDB } from "@/lib/mongo";
import Admin from "@/models/Admin";

export async function createAdmin(data: IAdminRequest) {
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
