import { IAuthInitialState } from "../Auth/interface";
import { INewsInitialState } from "../News/interface";

export interface IAppState {
  user: IAuthInitialState;
  news: INewsInitialState;
  readlist: INewsInitialState;
}

export interface IParam {
  id: string;
}
