import React from "react";
import { Table } from "react-bootstrap";
import { ICovidCountry } from "../../interface";

const CovidTable: React.FC<{ covidData: ICovidCountry[] | undefined }> = ({
  covidData,
}) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Country</th>
          <th>Total Cases</th>
          <th>New Cases</th>
          <th>Total Deaths</th>
          <th>New Deaths</th>
          <th>Total Recovered</th>
          <th>New Recovered</th>
          <th>Active Case</th>
        </tr>
      </thead>
      <tbody>
        {covidData !== undefined &&
          covidData.map((data, idx) => (
            <tr key={data.country}>
              <td>{idx + 1}</td>
              <th>{data.country}</th>
              <th>{data.cases}</th>
              <th className="bg-warning">
                {data.todayCases !== 0 && `+${data.todayCases}`}
              </th>
              <th>{data.deaths}</th>
              <th className="bg-danger">
                {data.todayDeaths !== 0 && `+${data.todayDeaths}`}
              </th>
              <th>{data.recovered}</th>
              <th className="bg-success">
                {data.todayRecovered !== 0 && `+${data.todayRecovered}`}
              </th>
              <th>{data.active}</th>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default CovidTable;
