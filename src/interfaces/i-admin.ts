export interface IAdmin {
  id?: string;
  email: string;
  password: string;
  name: string;
  title: string;
  imageUrl: string;
  imageAssetId: string;
  blurDataUrl?: string;
  resumeUrl: string;
  introduction: string;
  blocked: boolean;
}
