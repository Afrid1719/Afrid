import bcrypt from "bcryptjs";
import mongoose, { model, Schema, Types } from "mongoose";
import { IAdmin } from "@/interfaces/i-admin";
import { connectDB, disconnectDB } from "@/lib/mongo";
import { remote } from "@/utils/image-placeholder";

const projection = "-password -__v -updatedAt -createdAt";
const queryOptions = { lean: true };

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
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    imageUrl: {
      type: String
    },
    imageAssetId: {
      type: String
    },
    blurDataUrl: {
      type: String
    },
    resumeUrl: {
      type: String
    },
    introduction: {
      type: String,
      minlength: [50, "Introduction is too short"],
      maxlength: [500, "Introduction is too long"]
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

  if (this.isModified("imageUrl")) {
    this.blurDataUrl = ((await remote(this.imageUrl)) as any)?.base64;
    console.log(this.blurDataUrl);
    this.imageUrl = encodeURIComponent(this.imageUrl);
  }

  next();
});

AdminSchema.post("find", function (docs: Types.DocumentArray<IAdmin>) {
  docs.forEach((doc) => {
    if (doc.imageUrl) {
      doc.imageUrl = decodeURIComponent(doc.imageUrl);
    }
  });
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
  }
}

export async function getAdminByEmailOrId(
  query: string
): Promise<Omit<IAdmin, "password"> | null> {
  try {
    await connectDB();
    let isObjectId = mongoose.Types.ObjectId.isValid(query);
    const admin = isObjectId
      ? await Admin.findOne({ _id: query }, projection, queryOptions)
      : await Admin.findOne({ email: query }, projection, queryOptions);
    admin.id = admin._id.toString();
    delete admin._id;
    return admin || null;
  } catch (error) {
    throw error;
  }
}

export async function updateAdmin(id: string, data: Partial<IAdmin>) {
  try {
    await connectDB();
    const admin = await Admin.findByIdAndUpdate(id, data, {
      ...queryOptions,
      new: true,
      runValidators: true
    }).select(projection);
    admin.id = admin._id.toString();
    delete admin._id;
    return admin;
  } catch (error) {
    throw error;
  }
}
