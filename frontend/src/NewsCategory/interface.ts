import { INews } from "../News/interface";

export interface ICategoryByIdRes {
  categories: ICategory;
  news: INews[];
}

export interface ICategory {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
