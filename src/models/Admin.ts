import bcrypt from "bcryptjs";
import mongoose, { model, Schema, Types } from "mongoose";
import { IAdmin, IAdminWOPassword } from "@/interfaces/i-admin";
import { connectDB } from "@/lib/mongo";
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
    image: {
      assetId: String,
      url: String,
      secureUrl: String,
      publicId: String,
      width: Number,
      height: Number,
      resourceType: String
    },
    blurDataUrl: {
      type: String
    },
    resume: {
      url: String,
      secureUrl: String,
      publicId: String,
      width: Number,
      height: Number,
      resourceType: String
    },
    introduction: {
      type: String
    },
    phone: {
      type: String,
      match: [/^\+[0-9]{11,13}$/, "Phone number is invalid"]
    },
    socialLinks: [
      {
        type: new Schema(
          {
            name: String,
            link: String
          },
          {
            _id: false
          }
        )
      }
    ],
    location: String,
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

  if (!this.$isEmpty("image")) {
    if (this.isModified("image.url")) {
      this.blurDataUrl = ((await remote(this.image.url)) as any).base64;
      this.image.url = encodeURIComponent(this.image.url);
      this.image.secureUrl = encodeURIComponent(this.image.secureUrl);
    }
  }

  if (!this.$isEmpty("resume")) {
    if (this.isModified("resume.url")) {
      this.resume.url = encodeURIComponent(this.resume.url);
      this.resume.secureUrl = encodeURIComponent(this.resume.secureUrl);
    }
  }

  if (this.isModified("socialLinks")) {
    this.socialLinks = this.socialLinks.map((socialLink) => {
      return {
        name: socialLink.name,
        link: encodeURIComponent(socialLink.link)
      };
    });
  }

  next();
});

AdminSchema.post("find", function (docs: Types.DocumentArray<IAdmin>) {
  docs.forEach((doc) => {
    if (!doc.image) {
      doc.image.url = decodeURIComponent(doc.image?.url || "");
      doc.image.secureUrl = decodeURIComponent(doc.image?.secureUrl || "");
    }
    if (!doc.resume) {
      doc.resume.url = decodeURIComponent(doc.resume?.url || "");
      doc.resume.secureUrl = decodeURIComponent(doc.resume?.secureUrl || "");
    }
    if (doc.socialLinks.length > 0) {
      doc.socialLinks = doc.socialLinks.map((socialLink) => {
        return {
          name: socialLink.name,
          link: decodeURIComponent(socialLink.link)
        };
      });
    }
  });
});

const Admin =
  (mongoose.models?.Admin as mongoose.Model<IAdmin>) ||
  model("Admin", AdminSchema);

export default Admin;

/******* ADMIN FUNCTIONS ***********/

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
    return admins.map((admin) => {
      let ob = {
        id: admin._id.toString(),
        ...admin.toObject()
      };
      delete ob._id;
      return ob;
    });
  } catch (error) {
    throw error;
  }
}

export async function getAdminByEmailOrId(
  query: string
): Promise<IAdminWOPassword | null> {
  try {
    await connectDB();
    let isObjectId = mongoose.Types.ObjectId.isValid(query);
    let admin = isObjectId
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
