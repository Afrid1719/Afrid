import { IPaginationResult, IProject } from "@/interfaces/i-home";
import { connectDB, disconnectDB } from "@/lib/mongo";
import mongoose, { model, Schema, SchemaTypes, Types } from "mongoose";

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
    createdOn: {
      type: SchemaTypes.Date
    },
    preview: {
      // URL for preview image
      type: String,
      default: "https://via.placeholder.com/1200x800"
    },
    codeLink: {
      // Most likely a github URL
      type: String,
      required: [true, "Code link is required"]
    },
    images: {
      type: [String],
      default: []
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

ProjectSchema.post(
  "find",
  function (docs: Types.DocumentArray<IProject>, next) {
    docs.forEach((doc) => {
      if (doc.codeLink) {
        doc.codeLink = decodeURIComponent(doc.codeLink);
      }
      if (doc.preview) {
        doc.preview = decodeURIComponent(doc.preview);
      }
    });
    next();
  }
);

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

export async function getAllProjects(
  pageNumber = 1,
  pageSize = 2,
  query = ""
): Promise<IPaginationResult<IProject>> {
  try {
    await connectDB();
    let matchStage = query ? { name: { $regex: query, $options: "i" } } : {};
    let results = await Project.aggregate([
      { $match: matchStage },
      { $sort: { createdOn: -1, name: 1 } },
      {
        $facet: {
          data: [
            { $skip: (pageNumber - 1) * pageSize },
            { $limit: pageSize },
            {
              $project: {
                __v: 0,
                updatedAt: 0,
                createdAt: 0
              }
            }
          ],
          totalCount: [{ $count: "count" }]
        }
      }
    ]);
    results = JSON.parse(JSON.stringify(results));
    return {
      data: results[0].data.map((project: IProject) => ({
        ...project,
        codeLink: decodeURIComponent(project.codeLink),
        preview: decodeURIComponent(project.preview)
      })),
      totalCount: results[0].totalCount[0].count,
      totalPages: Math.ceil(results[0].totalCount[0].count / pageSize),
      currentPage: pageNumber,
      prevPage: pageNumber > 1 ? pageNumber - 1 : null,
      nextPage:
        pageNumber < results[0].totalCount[0].count / pageSize
          ? pageNumber + 1
          : null
    };
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
      new: true,
      lean: true
    }).select("-__v -updatedAt");
    if (!project) {
      throw new Error("Project not found");
    }

    return { ...project, preview: decodeURIComponent(project.preview) };
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
