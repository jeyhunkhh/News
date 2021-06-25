import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../News/actions";
import News from "../News/components";
import { IAppState } from "../redux/interface";
import Advertisement from "./Advertisement";
import CovidCard from "./Covid/CovidCard";
import { IntroSlider } from "./IntroSlider";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const news = useSelector((state: IAppState) => state.news);

  return (
    <>
      <div className="container">
        {news.status === "SUCCESS" ? (
          <>
            <div className="intro">
              <div className="row mt-5">
                <div className="col-lg-9">
                  <IntroSlider />
                </div>
                <div className="col-lg-3">
                  <CovidCard />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <Advertisement />
              </div>
            </div>
            <News />
          </>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "50vh" }}
          >
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
