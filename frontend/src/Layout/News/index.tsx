import React from "react";
import { Card } from "react-bootstrap";
import "./index.scss";

const News = () => {
  return (
    <Card className="new-item">
      <Card.Img
        variant="top"
        src="https://ychef.files.bbci.co.uk/1600x900/p09lwkb1.webp"
      />
      <Card.Body>
        <Card.Title className="title">
          The workers pushing back on the return to the office
        </Card.Title>
        <Card.Text className="time">
          <i className="far fa-calendar-alt"></i> 22/06/2021 17:20
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default News;
