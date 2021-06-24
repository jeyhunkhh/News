import { AUTH } from "../actions/consts";
import { IAuthAction } from "../interface";
import { IAuthInitialState } from "../interface";

const initialState: IAuthInitialState = {
  status: "",
  data: null,
  errors: [],
};

export const loginReducer = (state = initialState, action: IAuthAction) => {
  switch (action.type) {
    case `${AUTH.USER_LOGIN}_PENDING`:
      return {
        ...state,
        status: "PENDING",
      };

    case `${AUTH.USER_LOGIN}_SUCCESS`:
      return {
        ...state,
        status: "SUCCESS",
        data: action.payload,
      };

    case `${AUTH.USER_LOGIN}_ERROR`:
      return {
        ...state,
        status: "ERROR",
        errors: [...action.errors],
      };

    case `${AUTH.USER_LOGOUT}`: {
      return {
        status: "",
        data: null,
        errors: [],
      };
    }
    default:
      return state;
  }
};
