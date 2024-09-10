import { IProject } from "@/interfaces/i-home";
import { connectDB, disconnectDB } from "@/lib/mongo";
import mongoose, { Document, model, Schema, Types } from "mongoose";

export const ProjectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true
    },
    description: {
      type: String,
      maxlength: [500, "Description is too long"]
    },
    techs: {
      type: [String],
      required: [true, "Techs is required"]
    },
    preview: {
      // URL for preview image
      type: String,
      required: [true, "Preview is required"]
    },
    codeLink: {
      // Most likely a github URL
      type: String,
      required: [true, "Code link is required"]
    },
    url: String
  },
  {
    timestamps: true
  }
);

ProjectSchema.pre("save", async function (next) {
  if (this.isModified("codeLink")) {
    this.codeLink = encodeURIComponent(this.codeLink);
  }

  if (this.isModified("preview")) {
    this.preview = encodeURIComponent(this.preview);
  }
  next();
});

ProjectSchema.post("find", function (docs: Types.DocumentArray<IProject>) {
  docs.forEach((doc) => {
    if (doc.codeLink) {
      doc.codeLink = decodeURIComponent(doc.codeLink);
    }
    if (doc.preview) {
      doc.preview = decodeURIComponent(doc.preview);
    }
  });
});

export const Project =
  (mongoose.models?.Project as mongoose.Model<IProject>) ||
  model("Project", ProjectSchema);

export default Project;

/**** PROJECT FUNCTIONS */

export async function createProject(project: IProject) {
  try {
    await connectDB();
    const newProject = new Project(project);
    await newProject.save();
    return newProject;
  } catch (error) {
    throw error;
  } finally {
    await disconnectDB();
  }
}
