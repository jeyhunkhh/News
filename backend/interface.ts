import { Document, Model } from "mongoose";

export interface ICategory {
  _id: string;
  name: string;
}

export interface INews {
  _id: string;
  title: string;
  content: string;
  photo: string;
  categoryId: string;
  isSlider: boolean;
}

export interface IUser {
  email: string;
  fullname: string;
  password: string;
  role: string;
}

export interface IAuthPayload {
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  login: (email: string, password: string) => Promise<IUserDocument>;
}
