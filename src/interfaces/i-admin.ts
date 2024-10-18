import { IAsset } from "./i-asset";

export interface IAdmin {
  id?: string;
  email: string;
  password: string;
  name: string;
  title: string;
  image: IAsset;
  resume: IAsset;
  blurDataUrl?: string;
  introduction: string;
  phone: string;
  socialLinks: ISocialLinks[];
  location: string;
  blocked: boolean;
}

export interface ISocialLinks {
  name: string;
  link: string;
}

export interface IAdminWOPassword extends Omit<IAdmin, "password"> {}
