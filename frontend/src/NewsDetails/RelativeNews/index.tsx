import "./index.scss";
import { Card } from "react-bootstrap";
import React from "react";
import { useSelector } from "react-redux";
import { IAppState } from "../../redux/interface";
import { Base_Url } from "../../httpClient/consts";
import { Link } from "react-router-dom";

const RelativeNews: React.FC<{
  newsId: string;
  categoryId: string;
}> = ({ categoryId, newsId }) => {
  const news = useSelector((state: IAppState) => state.news);
  const data = news.data
    ?.filter((item) => item.categoryId === categoryId && item._id !== newsId)
    .slice(0, 3);
  return (
    <>
      <h4>Relative News</h4>
      {news.status === "SUCCESS" &&
        data?.map((item) => (
          <Card className="mb-3" key={item._id}>
            <Card.Img variant="top" src={`${Base_Url}/${item.photo}`} />
            <Card.Body className="relative-content">
              <Link to={`/news/${item._id}`}>{item.title}</Link>
            </Card.Body>
          </Card>
        ))}
    </>
  );
};

export default RelativeNews;
