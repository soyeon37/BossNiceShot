import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.css';

const SlideSolution = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1.8,
    slidesToScroll: 2,
    vertical: false, // 이 부분이 수평 슬라이딩 설정입니다
    arrows:false,
};

  return (
    <div className="slider-container-right">
      {/* <h2>Multiple Slider Example</h2> */}
      <Slider {...settings}>
        <div className="slide">Slide 1</div>
        <div className="slide">Slide 2</div>
        <div className="slide">Slide 3</div>
        <div className="slide">Slide 4</div>
      </Slider>
    </div>
  );
};

export default SlideSolution;
