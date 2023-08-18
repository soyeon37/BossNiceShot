import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.css';
import SolutionCapture1 from "../../assets/source/imgs/solcap1.PNG";
import SolutionCapture2 from "../../assets/source/imgs/solcap2.PNG";
import SolutionCapture3 from "../../assets/source/imgs/solcap3.PNG";
import SolutionCapture4 from "../../assets/source/imgs/solcap4.PNG";

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
    <div className="slider-container">
      {/* <h2>Multiple Slider Example</h2> */}
      <Slider {...settings}>
        <div className="slide">
          <img className='slide-solution' src={SolutionCapture1}></img>
          <div className='slide-solution-title'>스윙 속도 분석</div>
        </div>
        <div className="slide">
          <img className='slide-solution' src={SolutionCapture2}></img>
          <div className='slide-solution-title'>인식된 관절의 히트맵 및 체형 기반의 타원방정식</div>
        </div>
        <div className="slide">
          <img className='slide-solution' src={SolutionCapture3}></img>
          <div className='slide-solution-title'>스윙 자세 종합 평가</div>
        </div>
        <div className="slide">
          <img className='slide-solution' src={SolutionCapture4}></img>
          <div className='slide-solution-title'>Personalized Recommendation</div>
        </div>
      </Slider>
    </div>
  );
};

export default SlideSolution;
