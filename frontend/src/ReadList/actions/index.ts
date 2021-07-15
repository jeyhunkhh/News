import { READLIST_ACTIONS } from "./consts";
import { readListService } from "../service";
import { Dispatch } from "redux";

export const getReadlist = () => (dispatch: Dispatch) => {
  dispatch({
    type: `${READLIST_ACTIONS.GET_READLIST}_PENDING`,
  });
  readListService
    .getReadList()
    .then((res) => {
      let { data } = res;
      dispatch({
        type: `${READLIST_ACTIONS.GET_READLIST}_SUCCESS`,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch({
        type: `${READLIST_ACTIONS.GET_READLIST}_ERROR`,
        error: err,
      });
    });
};
