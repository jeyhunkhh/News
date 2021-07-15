import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Layout/Loading";
import { INews } from "../News/interface";
import { newsService } from "../News/service";
import { IParam } from "../redux/interface";
import RelativeNews from "./RelativeNews";

const NewsDetail = () => {
  const { id } = useParams<IParam>();
  const [news, setNews] = useState<INews>();

  useEffect(() => {
    newsService.getNewsById(id).then((res) => {
      setNews(res.data);
    });
  }, [id]);

  return (
    <div className="container">
      {news !== undefined ? (
        <div className="row">
          <div className="col-lg-9">
            <h2 className="my-4">{news?.title}</h2>
            <img
              src={news?.photo}
              alt="news-content"
              className="img-fluid mb-3"
            />
            <p>{news?.content}</p>
          </div>
          {news !== undefined && (
            <div className="col-lg-3 mt-5">
              <RelativeNews categoryId={news?.categoryId} newsId={id} />
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default NewsDetail;
