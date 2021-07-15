import { AUTH } from "../actions/consts";
import { IAuthAction } from "../interface";
import { IAuthInitialState } from "../interface";

export const initialState: IAuthInitialState = {
  status: "",
  data: null,
  errors: [],
};

export const loginReducer = (
  state = initialState,
  action: IAuthAction | null
) => {
  switch (action?.type) {
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
        errors: [action.errors],
      };

    case `${AUTH.USER_LOGOUT}`: {
      return {
        status: "",
        data: null,
        errors: [],
      };
    }

    case `${AUTH.USER_VERIFY}_PENDING`:
      return {
        ...state,
        status: "PENDING",
      };
    case `${AUTH.USER_VERIFY}_SUCCESS`:
      return {
        ...state,
        status: "SUCCESS",
        data: action.payload,
      };
    case `${AUTH.USER_VERIFY}_ERROR`:
      return {
        ...state,
        status: "ERROR",
        errors: [...action.errors],
      };

    default:
      return state;
  }
};
