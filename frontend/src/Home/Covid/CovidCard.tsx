import { Card } from "react-bootstrap";
import "./covidcard.scss";

const CovidCard = () => {
  return (
    <Card className="covid-card">
      <Card.Img
        variant="top"
        className="covid-img"
        src="https://etimg.etb2bimg.com/photo/81303342.cms"
      />
      <Card.Body>
        <Card.Title>
          <h3 className="title mb-3 text-center">Covid statistic</h3>
        </Card.Title>
        <Card.Text className="content text-center">
          Global total: <strong>1232323</strong>
        </Card.Text>
        <hr />
        <Card.Text className="content text-center">
          Azerbaijan total: <strong>1232323</strong>
        </Card.Text>
        <Card.Text className="content text-center">
          Azerbaijan today: <strong>123</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CovidCard;
