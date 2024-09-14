import { IAcademics } from "@/interfaces/i-professional";
import { connectDB } from "@/lib/mongo";
import mongoose, { Schema, Types } from "mongoose";

export enum AcademicLevel {
  HigherSecondary = "Higher Secondary",
  Secondary = "Secondary",
  Diploma = "Diploma",
  Bachelors = "Bachelors",
  Masters = "Masters",
  PhD = "PhD"
}

const AcademicsSchema = new Schema<IAcademics>(
  {
    level: {
      type: String,
      required: [true, "Level is required"],
      enum: AcademicLevel,
      default: "Bachelors"
    },
    degree: {
      type: String,
      minlength: [3, "Degree must be at least 3 characters"],
      maxlength: [100, "Degree must be at most 100 characters"],
      required: [true, "Degree is required"]
    },
    institutionName: {
      type: String,
      minlength: [5, "Institution name must be at least 5 characters"],
      maxlength: [150, "Institution name must be at most 150 characters"],
      required: [true, "Institution name is required"]
    },
    institutionImage: {
      type: String,
      default:
        "https://img.icons8.com/?size=100&id=RWH5eUW9Vr7f&format=png&color=000000"
    },
    startYear: {
      type: String,
      required: [true, "Start year is required"]
    },
    endYear: {
      type: String
    },
    isPursuing: {
      type: Boolean,
      default: false
    },
    marksObtained: {
      type: Number
    },
    marksOutOf: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

AcademicsSchema.pre("save", function (next) {
  if (this.isModified("institutionImage")) {
    this.institutionImage = encodeURIComponent(this.institutionImage);
  }
  next();
});

AcademicsSchema.post("find", function (docs: Types.DocumentArray<IAcademics>) {
  docs.forEach((doc) => {
    if (doc.institutionImage) {
      doc.institutionImage = decodeURIComponent(doc.institutionImage);
    }
    if (doc.isPursuing) [(doc.endYear = `${doc.endYear} (Expected)`)];
  });
});

const Academics =
  (mongoose.models?.Academic as mongoose.Model<IAcademics>) ||
  mongoose.model<IAcademics>("Academic", AcademicsSchema);

export default Academics;

/*****    ACADEMICS FUNCTIONS     ********/
export async function getAllAcademics() {
  try {
    await connectDB();
    const academics = await Academics.find()
      .sort({ startDate: -1 })
      .select("-__v -updatedAt -createdAt");
    return academics;
  } catch (error) {
    throw error;
  }
}

export async function createAcademics(academics: IAcademics) {
  try {
    await connectDB();
    const newAcademic = new Academics(academics);
    await newAcademic.save();
    const res = await Academics.findById(newAcademic._id).select(
      "-__v -updatedAt -createdAt"
    );
    return res;
  } catch (error) {
    throw error;
  }
}

export async function updateAcademics(
  id: string,
  academics: Partial<IAcademics>
) {
  try {
    await connectDB();
    return await Academics.findByIdAndUpdate(id, academics, {
      new: true,
      runValidators: true
    }).select("-__v -updatedAt -createdAt");
  } catch (error) {
    throw error;
  }
}

export async function deleteAcademics(id: string) {
  try {
    await connectDB();
    const academics = await Academics.findByIdAndDelete(id).select(
      "-__v -updatedAt -createdAt"
    );
    if (!academics) {
      throw new Error("Academics not found");
    }
    return academics;
  } catch (error) {
    throw error;
  }
}
