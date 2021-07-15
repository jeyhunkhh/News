import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./covidcard.scss";
import { ICovidGlobal } from "../../interface";
import { covidService } from "../../services";

const CovidCard = () => {
  const [covidGlobal, setcovidGlobal] = useState<ICovidGlobal>();

  useEffect(() => {
    covidService.getCovidGlobal().then((res) => setcovidGlobal(res.data));
  }, []);

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
          Global total: <strong>{covidGlobal?.cases}</strong>
        </Card.Text>
        <hr />
        <Card.Text className="content text-center">
          Global today: <strong>{covidGlobal?.todayCases}</strong>
        </Card.Text>
        <Link className="btn btn-success w-100" to="/covid">
          All Covid Info
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CovidCard;
