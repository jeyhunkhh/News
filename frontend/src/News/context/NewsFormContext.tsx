import React, { createContext, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getNews, updateNews } from "../actions";
import swal from "sweetalert";
import { logout } from "../../Auth/actions";
import { newsService } from "../service";

type NewsFormContextState = {
  handleUpdateSubmit: (
    evt: React.FormEvent,
    data: FormData,
    push: any,
    id: string
  ) => void;
  handleDelete: (id: string, push: any) => Promise<void> | null;
};

const contextDefaultValues: NewsFormContextState = {
  handleUpdateSubmit: () => {},
  handleDelete: () => null,
};

export const NewsFormContext =
  createContext<NewsFormContextState>(contextDefaultValues);

const NewsFormContextProvider: React.FC = (props) => {
  const dispatch = useDispatch();

  const handleUpdateSubmit = useCallback(
    async (evt: React.FormEvent, data: FormData, push: any, id: string) => {
      evt.preventDefault();
      await updateNews(data, id)
        .then(() => {
          dispatch(getNews());
          swal({
            title: "Congratulations!",
            text: "You have successfully update news!",
            icon: "success",
          });
        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            dispatch(logout());
            push("/login");
          }
        });
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    async (id: string, push: any) => {
      await newsService.deleteNews(id).catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          dispatch(logout());
          push("/login");
        }
      });
    },
    [dispatch]
  );

  return (
    <NewsFormContext.Provider value={{ handleUpdateSubmit, handleDelete }}>
      {props.children}
    </NewsFormContext.Provider>
  );
};

export default NewsFormContextProvider;
