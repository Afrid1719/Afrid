import mongoose from "mongoose";

export interface ISkill extends mongoose.Document {
  name: string;
  icon: string;
  rating: number;
  blurDataUrl?: string; // For image optimization, server generated
  [key: string]: any;
}

export interface IProject extends mongoose.Document {
  name: string;
  description?: string;
  preview?: string;
  codeLink: string;
  url?: string;
  techs: string[];
  images?: string[];
  blurDataUrl?: string; // For image optimization, server generated
  createdOn?: Date;
  [key: string]: any;
}

export interface ITool extends mongoose.Document {
  name: string;
  icon?: string;
  rating?: number;
  blurDataUrl?: string; // For image optimization, server generated
  [key: string]: any;
}

export interface IBlog {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: number;
  image?: string;
  blurDataUrl?: string;
  tags: string[];
  createdAt: Date;
}

export interface IPaginationResult<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  prevPage: number;
  nextPage: number;
}
