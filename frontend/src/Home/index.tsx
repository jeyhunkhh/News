import News from "../Layout/News";
import Paginate from "../Layout/Pagination";
import Advertisement from "./Advertisement";
import CovidCard from "./Covid/CovidCard";
import { IntroSlider } from "./IntroSlider";

const Home = () => {
  return (
    <>
      <div className="container">
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
        <div className="all-news">
          <div className="row">
            <div className="col-lg-4 mb-3">
              <News />
            </div>
            <div className="col-lg-4 mb-3">
              <News />
            </div>
            <div className="col-lg-4 mb-3">
              <News />
            </div>
          </div>
        </div>
        <div className="row my-5 justify-content-center">
          <div className="col-lg-6">
            <Paginate />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
