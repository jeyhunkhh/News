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

export const addNews = async (newData: FormData) => {
  await newsService.addNews(newData);
};

export const updateNews = async (updateData: FormData, id: string) => {
  await newsService.updateNews(updateData, id);
};
