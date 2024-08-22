export interface IWorkExperience {
  id: string;
  position: string;
  company: string;
  duration: string;
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
  marksObtained?: number;
  marksOutOf?: number;
}
