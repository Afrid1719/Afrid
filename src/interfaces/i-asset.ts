export interface IAsset {
  _id?: string;
  assetId: string;
  url: string;
  secureUrl: string;
  publicId: string;
  width?: number;
  height?: number;
  resourceType: string;
}
