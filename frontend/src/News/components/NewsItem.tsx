import React from "react";
import { Card } from "react-bootstrap";
import { Base_Url } from "../../httpClient/consts";
import { INews } from "../interface";
import moment from "moment";
import { Link } from "react-router-dom";

const NewsItem: React.FC<{ news: INews }> = ({ news }) => {
  return (
    <Card className="new-item">
      <Card.Img variant="top" src={`${Base_Url}/${news.photo}`} />
      <Card.Body>
        <Card.Title className="title">
          <Link to={`/news/${news._id}`}>{news.title}</Link>
        </Card.Title>
        <Card.Text className="time">
          <i className="far fa-calendar-alt"></i>{" "}
          {moment(news.createdAt).format("MMMM Do YYYY, h:mm")}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default NewsItem;
