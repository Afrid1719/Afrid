export interface ISkill {
  id: string;
  name: string;
  icon: string;
  rating: number;
}

export interface IMyProject {
  id: string;
  name: string;
  description?: string;
  preview: string;
  codeLink: string;
  url?: string;
  techs: string[];
}
