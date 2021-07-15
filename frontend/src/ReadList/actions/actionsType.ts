import { INews } from "../../News/interface";
import { READLIST_ACTIONS } from "./consts";

export interface GET_READLIST {
  type: READLIST_ACTIONS.GET_READLIST | string;
  payload: INews | null;
  error: string[] | null;
}

export type Action = GET_READLIST;
