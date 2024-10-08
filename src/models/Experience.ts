import { IExperience } from "@/interfaces/i-professional";
import { connectDB } from "@/lib/mongo";
import mongoose, { SchemaTypes } from "mongoose";

export const ExperienceSchema = new mongoose.Schema<IExperience>(
  {
    position: {
      type: String,
      required: [true, "Position is required"],
      minlength: [3, "Position must be at least 3 characters"],
      maxlength: [50, "Position must be at most 50 characters"]
    },
    company: {
      type: String,
      required: [true, "Company is required"],
      minlength: [5, "Company must be at least 5 characters"],
      maxlength: [100, "Company must be at most 100 characters"]
    },
    startDate: {
      type: SchemaTypes.Date,
      required: [true, "Start date is required"]
    },
    endDate: {
      type: SchemaTypes.Date
    },
    description: {
      type: [String],
      required: [true, "Description is required"]
    },
    techs: {
      type: [String],
      required: [true, "Techs is required"]
    }
  },
  {
    timestamps: true
  }
);

const Experience =
  (mongoose.models?.Experience as mongoose.Model<IExperience>) ||
  mongoose.model<IExperience>("Experience", ExperienceSchema);

export default Experience;

/*****   EXPERIENCE FUNCTIONS  *******/

export async function getAllExperiences() {
  try {
    await connectDB();
    const experiences = await Experience.find()
      .sort({ startDate: -1 })
      .select("-__v -updatedAt -createdAt");
    return experiences;
  } catch (error) {
    throw error;
  }
}

export async function createExperience(experience: IExperience) {
  try {
    await connectDB();
    const newExperience = new Experience(experience);
    await newExperience.save();
    const res = await Experience.findById(newExperience._id).select(
      "-__v -updatedAt -createdAt"
    );
    return res;
  } catch (error) {
    throw error;
  }
}

export async function updateExperience(
  id: string,
  experience: Partial<IExperience>
) {
  try {
    await connectDB();
    return await Experience.findByIdAndUpdate(id, experience, {
      new: true,
      runValidators: true
    }).select("-__v -updatedAt -createdAt");
  } catch (error) {
    throw error;
  }
}

export async function deleteExperience(id: string) {
  try {
    await connectDB();
    const experience = await Experience.findByIdAndDelete(id).select(
      "-__v -updatedAt -createdAt"
    );
    if (!experience) {
      throw new Error("Experience not found");
    }
    return experience;
  } catch (error) {
    throw error;
  }
}
