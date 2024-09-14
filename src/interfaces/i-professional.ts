import mongoose from "mongoose";

export interface IExperience extends mongoose.Document {
  position: string;
  company: string;
  startDate: Date;
  endDate: Date;
  description: string[];
  techs: string[];
}

export interface IAcademics extends mongoose.Document {
  id: string;
  level: string;
  degree: string;
  institutionImage?: string;
  institutionName: string;
  startYear: string;
  endYear?: string;
  isPursuing?: boolean;
  marksObtained?: number;
  marksOutOf?: number;
}
