import { ITool } from "@/interfaces/i-home";
import { connectDB, disconnectDB } from "@/lib/mongo";
import mongoose from "mongoose";

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
    rating: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

ToolSchema.pre("save", function (next) {
  if (this.isModified("icon")) {
    this.icon = encodeURIComponent(this.icon);
  }
  next();
});

const Tool =
  (mongoose.models?.Tool as mongoose.Model<ITool>) ||
  mongoose.model<ITool>("Tool", ToolSchema);

export default Tool;

export const createTool = async (data: ITool) => {
  try {
    await connectDB();
    const tool = new Tool(data);
    await tool.save();
    return tool;
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
