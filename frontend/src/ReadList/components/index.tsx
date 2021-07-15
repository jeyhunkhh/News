import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Layout/Loading";
import News from "../../News/components";
import NewsFormContextProvider from "../../News/context/NewsFormContext";
import { IAppState } from "../../redux/interface";
import { getReadlist } from "../actions";
import "./index.scss";

const ReadList = () => {
  const dispatch = useDispatch();
  const readlistNews = useSelector((state: IAppState) => state.readlist);
  const { data } = readlistNews;

  useEffect(() => {
    dispatch(getReadlist());
  }, [dispatch]);

  return (
    <div className="container my-3">
      <h3 className="read-title">Read List</h3>
      <NewsFormContextProvider>
        {readlistNews.status === "SUCCESS" ? (
          data.length > 0 ? (
            <News news={data} />
          ) : (
            <div className="text-center w-100 text-secondary my-5 h3 read-content">
              Your reading list is empty...
            </div>
          )
        ) : (
          <Loading />
        )}
      </NewsFormContextProvider>
    </div>
  );
};

export default ReadList;
