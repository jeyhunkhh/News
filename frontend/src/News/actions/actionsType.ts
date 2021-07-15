import { INews } from "../interface";
import { NEWS_ACTIONS } from "./consts";

export interface GET_NEWS {
  type: NEWS_ACTIONS.GET_NEWS | string;
  payload: INews | null;
  error: string[] | null;
}

export interface ADD_NEWS {
  type: NEWS_ACTIONS.ADD_NEWS;
  payload: INews;
  error: null;
}

export type Action = GET_NEWS | ADD_NEWS;
