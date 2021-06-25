import { IAuthInitialState } from "../Auth/interface";
import { INewsInitialState } from "../News/interface";

export interface IAppState {
  user: IAuthInitialState;
  news: INewsInitialState;
}
