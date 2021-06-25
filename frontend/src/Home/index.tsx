import News from "../News/components";
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
        <News />
      </div>
    </>
  );
};

export default Home;
