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
  blocked: boolean;
}

export interface IAdminWOPassword extends Omit<IAdmin, "password"> {}
