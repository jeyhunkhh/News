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
    })
    .catch((err) => {
      dispatch({
        type: `${AUTH.USER_LOGIN}_ERROR`,
        errors: [err.response.data.message],
      });
    });
};

export const logout = () => async (dispatch: Dispatch) => {
  dispatch({
    type: `${AUTH.USER_LOGOUT}`,
  });
};

export const verifyUserInfo = () => async (dispatch: Dispatch) => {
  dispatch({
    type: `${AUTH.USER_VERIFY}_PENDING`,
  });
  await authService
    .verifyUser()
    .then((res) => {
      dispatch({
        type: `${AUTH.USER_VERIFY}_SUCCESS`,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: `${AUTH.USER_VERIFY}_ERROR`,
        errors: [err.response.data.message],
      });
    });
};
