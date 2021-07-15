import { Action } from "../actions/actionsType";
import { READLIST_ACTIONS } from "../actions/consts";
import { INewsInitialState } from "../../News/interface";

export const initialState: INewsInitialState = {
  status: "",
  data: [],
  errors: [],
};

export const readlistReducer = (
  state = initialState,
  action: Action | null
) => {
  switch (action?.type) {
    case `${READLIST_ACTIONS.GET_READLIST}_PENDING`:
      return {
        ...state,
        status: "PENDING",
      };
    case `${READLIST_ACTIONS.GET_READLIST}_SUCCESS`:
      return {
        ...state,
        data: action.payload,
        status: "SUCCESS",
      };
    case `${READLIST_ACTIONS.GET_READLIST}_ERROR`:
      return {
        ...state,
        err: [action.error],
        status: "ERROR",
      };

    default:
      return state;
  }
};
