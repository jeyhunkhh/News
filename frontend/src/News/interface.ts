export interface INews {
  _id: string;
  title: string;
  content: string;
  isSlider: boolean;
  categoryId: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface INewsInitialState {
  status: string;
  data: INews[];
  errors: [];
}

export interface INewsForm {
  title: string;
  content: string;
  isSlider: boolean;
  categoryId: string;
  photo: string;
}
