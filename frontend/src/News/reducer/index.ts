import { Action } from "../actions/actionsType";
import { NEWS_ACTIONS } from "../actions/consts";
import { INewsInitialState } from "../interface";

export const initialState: INewsInitialState = {
  status: "",
  data: [],
  errors: [],
};

export const newsReducer = (state = initialState, action: Action | null) => {
  switch (action?.type) {
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

    case `${NEWS_ACTIONS.ADD_NEWS}_PENDING`:
      return {
        ...state,
        status: "PENDING",
      };
    case `${NEWS_ACTIONS.ADD_NEWS}_SUCCESS`:
      return {
        ...state,
        data: [...state.data, action.payload],
        status: "SUCCESS",
      };
    case `${NEWS_ACTIONS.ADD_NEWS}_ERROR`:
      return {
        ...state,
        err: [action.error],
        status: "ERROR",
      };
    default:
      return state;
  }
};
