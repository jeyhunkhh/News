export interface INews {
  _id: string;
  title: string;
  content: string;
  isSlider: boolean;
  categoryId: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface INewsInitialState {
  status: string;
  data: INews[] | null;
  errors: [];
}
