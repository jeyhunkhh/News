import "./index.scss";
import { Card } from "react-bootstrap";

const RelativeNews = () => {
  return (
    <>
      <h4>Relative News</h4>
      <Card className="mb-3">
        <Card.Img
          variant="top"
          src="https://ichef.bbci.co.uk/news/976/cpsprodpb/7CD9/production/_116516913_galileo_satellites_moved_to_s3b_building.jpg"
        />
        <Card.Body className="relative-content">
          <Card.Text>
            Lift-off for European Union's new space programme
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Img
          variant="top"
          src="https://ichef.bbci.co.uk/news/976/cpsprodpb/7CD9/production/_116516913_galileo_satellites_moved_to_s3b_building.jpg"
        />
        <Card.Body className="content">
          <Card.Text>
            Lift-off for European Union's new space programme
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Img
          variant="top"
          src="https://ichef.bbci.co.uk/news/976/cpsprodpb/7CD9/production/_116516913_galileo_satellites_moved_to_s3b_building.jpg"
        />
        <Card.Body className="content">
          <Card.Text>
            Lift-off for European Union's new space programme
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default RelativeNews;
