import React from "react";
import RelativeNews from "./RelativeNews";

const NewsDetail = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <h2 className="my-4">
            'Heartbreaking' conditions in US migrant child camp
          </h2>
          <img
            src="https://ichef.bbci.co.uk/news/976/cpsprodpb/ACAB/production/_119030244_microsoftteams-image-6.png"
            alt="news-content"
            className="img-fluid mb-3"
          />
          <p>
            In recent months, the US has seen a massive rise in migrants and
            asylum seekers from Central America. Violence, natural disasters and
            pandemic-related economic strife are some of the reasons behind the
            influx, experts say.
          </p>
          <p>
            Some have also suggested the perception of a more lenient
            administration under Democrat Joe Biden has contributed to the
            crisis, though the White House has urged migrants against journeying
            to the US border.
          </p>
        </div>
        <div className="col-lg-3 mt-5">
          <RelativeNews />
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
