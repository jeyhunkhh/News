import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import Loading from "../../Layout/Loading";
import { ICovidCountry, ICovidGlobal } from "../interface";
import { covidService } from "../services";
import CovidTable from "./CovidTable";
import "./index.scss";

const Covid = () => {
  const [covidData, setCovidData] = useState<ICovidCountry[] | undefined>();
  const [covidGlobal, setcovidGlobal] = useState<ICovidGlobal>();
  const [searchqQuery, setSearchqQuery] = useState("");

  useEffect(() => {
    covidService.getCovidGlobal().then((res) => setcovidGlobal(res.data));
    covidService.getCovidCountries().then((res) => setCovidData(res.data));
  }, []);

  const handleInputChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setSearchqQuery(evt.target.value);
    },
    []
  );

  const computedCovidData = useMemo(() => {
    let computed = covidData;

    if (computed !== undefined && searchqQuery) {
      computed = computed!.filter((item) =>
        item.country.toLowerCase().includes(searchqQuery.trim().toLowerCase())
      );
    }
    return computed;
  }, [covidData, searchqQuery]);

  return (
    <div className="container">
      {covidData !== undefined && covidGlobal !== undefined ? (
        <>
          <h1 className="covid-title my-3">Covid statistics </h1>
          <div className="row my-4">
            <div className="col-lg-4 text-center">
              <h3 className="text-warning">Total Cases</h3>
              <h1>{covidGlobal?.cases}</h1>
            </div>
            <div className="col-lg-4 text-center">
              <h3 className="text-danger">Total Deaths</h3>
              <h1>{covidGlobal?.deaths}</h1>
            </div>
            <div className="col-lg-4 text-center">
              <h3 className="text-success">Total Recovered</h3>
              <h1>{covidGlobal?.recovered}</h1>
            </div>
          </div>
          <Form>
            <FormControl
              type="text"
              onChange={handleInputChange}
              placeholder="Search Country"
              className="mb-1"
            />
          </Form>
          <CovidTable covidData={computedCovidData} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Covid;
