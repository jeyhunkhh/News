import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Base_Url } from "../../httpClient/consts";
import { IAppState } from "../../redux/interface";
import "./index.scss";

export const IntroSlider = () => {
  const [index, setIndex] = useState(0);
  const news = useSelector((state: IAppState) => state.news);
  const { data } = news;

  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      className="intro-slider"
      activeIndex={index}
      onSelect={handleSelect}
    >
      {news.status === "SUCCESS" &&
        data
          ?.filter((item) => item.isSlider === true)
          .map((item) => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`${Base_Url}/${item.photo}`}
                alt={item.title}
              />
              <Carousel.Caption className="content">
                <h3>{item.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
    </Carousel>
  );
};
