import { ISkill } from "@/interfaces/i-home";
import { connectDB, disconnectDB } from "@/lib/mongo";
import mongoose, { Types } from "mongoose";

export const SkillSchema = new mongoose.Schema<ISkill>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true
    },
    icon: {
      type: String,
      default: "https://via.placeholder.com/64"
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"]
    }
  },
  {
    timestamps: true
  }
);

SkillSchema.pre("save", function (next) {
  if (this.isModified("icon")) {
    this.icon = encodeURIComponent(this.icon);
  }
  next();
});

SkillSchema.post("find", function (docs: Types.DocumentArray<ISkill>) {
  docs.forEach((doc) => {
    if (doc.icon) {
      doc.icon = decodeURIComponent(doc.icon);
    }
  });
});

const Skill =
  (mongoose.models?.Skill as mongoose.Model<ISkill>) ||
  mongoose.model<ISkill>("Skill", SkillSchema);

export default Skill;

/*****   SKILL FUNCTIONS  *******/

export async function createSkill(skill: ISkill) {
  try {
    await connectDB();
    const newSkill = new Skill(skill);
    await newSkill.save();
    return newSkill;
  } catch (error) {
    throw error;
  } finally {
    await disconnectDB();
  }
}

export async function getSkills() {
  try {
    await connectDB();
    return await Skill.find().sort({ rating: -1 }).select("-__v -updatedAt");
  } catch (error) {
    throw error;
  }
}

export async function updateSkill(id: string, skill: Partial<ISkill>) {
  try {
    await connectDB();
    return await Skill.findByIdAndUpdate(id, skill, {
      new: true,
      runValidators: true
    }).select("-__v -updatedAt");
  } catch (error) {
    throw error;
  } finally {
    await disconnectDB();
  }
}

export async function deleteSkill(id: string) {
  try {
    await connectDB();
    const skill = await Skill.findByIdAndDelete(id).select("-__v -updatedAt");
    if (!skill) {
      throw new Error("Skill not found");
    }
    return skill;
  } catch (error) {
    throw error;
  } finally {
    await disconnectDB();
  }
}
