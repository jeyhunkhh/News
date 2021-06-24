import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "./index.scss";

export const IntroSlider = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      className="intro-slider"
      activeIndex={index}
      onSelect={handleSelect}
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://ychef.files.bbci.co.uk/1600x900/p09lwkb1.webp"
          alt="First slide"
        />
        <Carousel.Caption className="content">
          <h3>First slide label</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://apa.az/storage/news/2021/june/22/big/60d18917b1d6660d18917b1d67162434485560d18917b1d6460d18917b1d65.jpg"
          alt="Second slide"
        />
        <Carousel.Caption className="content">
          <h3>Second slide label</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1120w,f_auto,q_auto:best/newscms/2021_25/3485091/210621-california-wildfire-ew-137p.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className="content">
          <h3>Third slide label</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
