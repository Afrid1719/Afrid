import { ITool } from "@/interfaces/i-home";
import { connectDB, disconnectDB } from "@/lib/mongo";
import { remote } from "@/utils/image-placeholder";
import mongoose, { Types } from "mongoose";

export const ToolSchema = new mongoose.Schema<ITool>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true
    },
    icon: {
      type: String,
      default:
        "https://img.icons8.com/?size=100&id=41888&format=png&color=000000"
    },
    blurDataUrl: {
      type: String
    },
    rating: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

ToolSchema.pre("save", async function (next) {
  this.blurDataUrl = ((await remote(this.icon)) as any)?.base64;
  if (this.isModified("icon")) {
    this.icon = encodeURIComponent(this.icon);
  }
  next();
});

ToolSchema.post("find", function (docs: Types.DocumentArray<ITool>) {
  docs.forEach((doc) => {
    if (doc.icon) {
      doc.icon = decodeURIComponent(doc.icon);
    }
  });
});

const Tool =
  (mongoose.models?.Tool as mongoose.Model<ITool>) ||
  mongoose.model<ITool>("Tool", ToolSchema);

export default Tool;

export const createTool = async (data: ITool) => {
  try {
    await connectDB();
    const tool = new Tool(data);
    const newTool = await tool.save();
    return await Tool.findById(newTool._id).select("-__v -updatedAt");
  } catch (error) {
    throw error;
  } finally {
    await disconnectDB();
  }
};

export const getTools = async () => {
  try {
    await connectDB();
    const tools = await Tool.find().sort({ name: 1 }).select("-__v -updatedAt");
    return tools;
  } catch (error) {
    throw error;
  } finally {
    await disconnectDB();
  }
};

export const updateTool = async (id: string, data: Partial<ITool>) => {
  try {
    await connectDB();
    const tool = await Tool.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).select("-__v -updatedAt");
    return tool;
  } catch (error) {
    throw error;
  } finally {
    await disconnectDB();
  }
};

export const deleteTool = async (id: string) => {
  try {
    await connectDB();
    const tool = await Tool.findByIdAndDelete(id).select("-__v -updatedAt");
    if (!tool) {
      throw new Error("Skill not found");
    }
    return tool;
  } catch (error) {
    throw error;
  } finally {
    await disconnectDB();
  }
};
