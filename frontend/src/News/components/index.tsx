import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../Auth/actions";
import { IAppState } from "../../redux/interface";
import { addNews, getNews } from "../actions";
import AddNewsForm from "./AddNewsForm";
import "./index.scss";
import NewsItem from "./NewsItem";
import swal from "sweetalert";
import NewsFormContextProvider from "../context/NewsFormContext";
import { readListService } from "../../ReadList/service";
import { INews } from "../interface";
import { getReadlist } from "../../ReadList/actions";

const News: React.FC<{ news: INews[] }> = ({ news }) => {
  const [newsCount, setNewsCount] = useState(6);
  const [readListNews, setReadListNews] = useState<INews[]>();
  const dispatch = useDispatch();
  const user = useSelector((state: IAppState) => state.user);
  const { push } = useHistory();

  useEffect(() => {
    user.status === "SUCCESS" &&
      readListService.getReadList().then((res) => {
        setReadListNews(res.data);
      });
  }, [user]);

  const computedNews = useMemo(() => {
    let computed = news;

    if (computed !== null) {
      computed = computed!.slice(0, newsCount);
    }

    return [computed];
  }, [news, newsCount]);

  const handleAddShow = useCallback(() => {
    setNewsCount(newsCount + 6);
  }, [newsCount]);

  const handleAddSubmit = useCallback(
    async (evt: React.FormEvent, data) => {
      evt.preventDefault();
      addNews(data)
        .then((res) => {
          dispatch(getNews());
          swal({
            title: "Congratulations!",
            text: "You have successfully added new News!",
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
    [dispatch, push]
  );

  const checkReadButton = useCallback(
    (id: string) => {
      if (
        readListNews !== undefined &&
        readListNews?.some((readNews) => readNews._id === id)
      ) {
        return false;
      } else {
        return true;
      }
    },
    [readListNews]
  );

  const removeNewsFromReadList = useCallback(
    (id: string) => {
      readListService
        .removeNewsFromReadList(id)
        .then(() =>
          readListService.getReadList().then((res) => {
            setReadListNews(res.data);
          })
        )
        .then(() => dispatch(getReadlist()));
    },
    [dispatch]
  );

  const addNewsfromReadList = useCallback((id: string) => {
    readListService.addReadList({ _id: id }).then(() =>
      readListService.getReadList().then((res) => {
        setReadListNews(res.data);
      })
    );
  }, []);

  return (
    <div className="all-news my-3">
      {news !== null && user.data?.role === "Admin" && (
        <div className="d-flex justify-content-end mb-3">
          <AddNewsForm handleAddSubmit={handleAddSubmit} />
        </div>
      )}
      <NewsFormContextProvider>
        <div className="row">
          {news !== null &&
            computedNews[0]?.map((item) => {
              const isReadList = checkReadButton(item._id);
              return (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 mb-4"
                  key={item._id}
                >
                  <NewsItem
                    news={item}
                    isReadList={isReadList}
                    removeNewsFromReadList={removeNewsFromReadList}
                    addNewsfromReadList={addNewsfromReadList}
                  />
                </div>
              );
            })}
        </div>
      </NewsFormContextProvider>
      <div className="text-center">
        {news !== null && newsCount < news.length && (
          <Button onClick={handleAddShow} variant="success">
            Show More
          </Button>
        )}
      </div>
    </div>
  );
};

export default News;
