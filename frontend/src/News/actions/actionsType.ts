import { INews } from "../interface";
import { NEWS_ACTIONS } from "./consts";

interface GET_NEWS {
  type: NEWS_ACTIONS.GET_NEWS;
  payload: INews;
  error: null;
}

export type Action = GET_NEWS;
