import { IProject } from "@/interfaces/i-home";
import { connectDB, disconnectDB } from "@/lib/mongo";
import mongoose, { model, Schema, Types } from "mongoose";

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
      default: "https://via.placeholder.com/800x800"
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

ProjectSchema.pre("save", function (next) {
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

export async function getAllProjects() {
  try {
    await connectDB();
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .select("-__v -updatedAt");
    return projects;
  } catch (error) {
    throw error;
  } finally {
    await disconnectDB();
  }
}

export async function getProjectById(id: string) {
  try {
    await connectDB();
    const project = await Project.findById(id).select("-__v -updatedAt");
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  } catch (error) {
    throw error;
  } finally {
    await disconnectDB();
  }
}

export async function getProjectByName(name: string) {
  try {
    await connectDB();
    const project = await Project.findOne({ name }).select("-__v -updatedAt");
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  } catch (error) {
    throw error;
  } finally {
    await disconnectDB();
  }
}

export async function updateProject(id: string, data: Partial<IProject>) {
  try {
    await connectDB();
    const project = await Project.findByIdAndUpdate(id, data, {
      new: true
    }).select("-__v -updatedAt");
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  } catch (error) {
    throw error;
  } finally {
    await disconnectDB();
  }
}

export async function deleteProject(id: string) {
  try {
    await connectDB();
    const project = await Project.findByIdAndDelete(id).select(
      "-__v -updatedAt"
    );
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  } catch (error) {
    throw error;
  } finally {
    await disconnectDB();
  }
}
