import { Date } from "mongoose";

export interface IExperience {
  position: string;
  company: string;
  startDate: Date;
  endDate: Date;
  description: string[];
  techs: string[];
}

export interface IAcademics {
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
