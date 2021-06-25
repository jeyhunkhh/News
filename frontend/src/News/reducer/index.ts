import { Action } from "../actions/actionsType";
import { NEWS_ACTIONS } from "../actions/consts";
import { INewsInitialState } from "../interface";

const initialState: INewsInitialState = {
  status: "",
  data: null,
  errors: [],
};

export const newsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case `${NEWS_ACTIONS.GET_NEWS}_PENDING`:
      return {
        ...state,
        status: "PENDING",
      };
    case `${NEWS_ACTIONS.GET_NEWS}_SUCCESS`:
      return {
        ...state,
        data: action.payload,
        status: "SUCCESS",
      };
    case `${NEWS_ACTIONS.GET_NEWS}_ERROR`:
      return {
        ...state,
        err: [action.error],
        status: "ERROR",
      };
    default:
      return state;
  }
};
