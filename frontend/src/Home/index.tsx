import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../News/actions";
import News from "../News/components";
import { IAppState } from "../redux/interface";
import CovidCard from "../Covid/components/CovidCard/CovidCard";
import { IntroSlider } from "./IntroSlider";
import Weather from "./Weather";
import Loading from "../Layout/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const news = useSelector((state: IAppState) => state.news);
  const { data } = news;

  useEffect(() => {
    if (news.status !== "SUCCESS") {
      dispatch(getNews());
    }
  }, [dispatch, news.status]);

  return (
    <>
      <div className="container">
        {news.status === "SUCCESS" ? (
          <>
            <div className="intro">
              <div className="row mt-5">
                <div className="col-lg-9 mb-3">
                  <IntroSlider />
                </div>
                <div className="col-lg-3">
                  <CovidCard />
                </div>
              </div>
            </div>
            <Weather />
            <News news={data} />
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Home;
