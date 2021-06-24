import { Dispatch } from "redux";
import { ILogin } from "../interface";
import { authService } from "../service";
import { AUTH } from "./consts";

export const login = (data: ILogin) => async (dispatch: Dispatch) => {
  dispatch({
    type: `${AUTH.USER_LOGIN}_PENDING`,
  });
  await authService
    .loginUser(data)
    .then((res) => {
      localStorage.setItem("token", res.data.access_token);
      dispatch({
        type: `${AUTH.USER_LOGIN}_SUCCESS`,
        payload: res.data.user,
      });
      return res;
    })
    .catch((err) =>
      dispatch({
        type: `${AUTH.USER_LOGIN}_ERROR`,
        errors: [err.message],
      })
    );
};

export const logout = () => async (dispatch: Dispatch) => {
  dispatch({
    type: `${AUTH.USER_LOGOUT}`,
  });
};
