import { connectDB, disconnectDB } from "@/lib/mongo";
import { IBlog, IPaginationResult, IProject, ITool } from "@/interfaces/i-home";
import { remote } from "@/utils/image-placeholder";
import mongoose, { Schema, Types } from "mongoose";

export const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [80, "Title must be at most 80 characters"]
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      maxlength: [120, "Excerpt must be at most 120 characters"]
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [3, "Content must be at least 3 characters"]
    },
    readTime: {
      type: Number,
      required: [true, "Read time is required"]
    },
    image: {
      type: String
    },
    blurDataUrl: {
      type: String
    },
    tags: {
      type: [String],
      required: [true, "Tags is required"],
      maxlength: [10, "Tags must be at most 10 characters"]
    }
  },
  {
    timestamps: true
  }
);

BlogSchema.pre("save", async function (next) {
  if (this.image) {
    this.blurDataUrl = ((await remote(this.image)) as any)?.base64;
  }
  next();
});

BlogSchema.pre("findOneAndUpdate", async function (next) {
  const update: IBlog = this.getUpdate() as IBlog;
  if (update && update.image) {
    update.blurDataUrl = ((await remote(update.image)) as any)?.base64;
    this.setUpdate(update);
  }
  next();
});

BlogSchema.post("find", function (docs: Types.DocumentArray<IBlog>) {
  docs.forEach((doc) => {
    if (doc.image) {
      doc.image = decodeURIComponent(doc.image);
    }
  });
});

const Blog =
  (mongoose.models?.Blog as mongoose.Model<IBlog>) ||
  mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;

export async function getBlogs(
  pageNumber = 1,
  pageSize = 20,
  query = ""
): Promise<IPaginationResult<IBlog>> {
  try {
    await connectDB();
    let matchStage = query ? { title: { $regex: query, $options: "i" } } : {};
    let results = await Blog.aggregate([
      { $match: matchStage },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          data: [
            { $skip: (pageNumber - 1) * pageSize },
            { $limit: pageSize },
            {
              $project: {
                __v: 0,
                updatedAt: 0
              }
            }
          ],
          totalCount: [{ $count: "count" }]
        }
      }
    ]);

    results = JSON.parse(JSON.stringify(results));

    if (results[0].data.length === 0) {
      return {
        data: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: pageNumber,
        prevPage: null,
        nextPage: null
      };
    }

    return {
      data: results[0].data,
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
    console.error(error);
    throw error;
  }
}

export const getBlogById = async (id: string): Promise<IBlog | null> => {
  try {
    await connectDB();
    let blog = await Blog.findById(id, { __v: 0, updatedAt: 0 }).lean();
    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createBlog = async (blog: Omit<IBlog, "_id">): Promise<IBlog> => {
  try {
    await connectDB();
    const newBlog = await Blog.create(blog);
    return newBlog;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateBlogById = async (
  id: string,
  blog: Partial<IBlog>
): Promise<IBlog | null> => {
  try {
    await connectDB();
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
      new: true
    }).lean();
    return updatedBlog;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteBlogById = async (id: string): Promise<IBlog> => {
  try {
    await connectDB();
    const deletedBlog = await Blog.findByIdAndDelete(id).lean();
    return deletedBlog;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
