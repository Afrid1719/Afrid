export interface ISkill {
  id?: string;
  name: string;
  icon: string;
  rating: number;
}

export interface IProject {
  id?: string;
  name: string;
  description?: string;
  preview?: string;
  codeLink: string;
  url?: string;
  techs: string[];
  [key: string]: string | string[];
}

export interface ITool {
  id?: string;
  name: string;
  icon: string;
  rating?: number;
}
