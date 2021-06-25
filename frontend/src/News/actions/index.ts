import { NEWS_ACTIONS } from "./consts";
import { newsService } from "../service";
import { Dispatch } from "redux";

export const getNews = () => (dispatch: Dispatch) => {
  dispatch({
    type: `${NEWS_ACTIONS.GET_NEWS}_PENDING`,
  });
  newsService
    .getNews()
    .then((res) => {
      let { data } = res;
      dispatch({
        type: `${NEWS_ACTIONS.GET_NEWS}_SUCCESS`,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch({
        type: `${NEWS_ACTIONS.GET_NEWS}_ERROR`,
        error: err,
      });
    });
};
