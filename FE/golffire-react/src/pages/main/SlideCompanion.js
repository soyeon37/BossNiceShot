import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.css';
import CompanionCapture1 from "../../assets/source/imgs/accompanycap1.PNG";
import CompanionCapture2 from "../../assets/source/imgs/accompanycap2.PNG";
import CompanionCapture3 from "../../assets/source/imgs/accompanycap3.PNG";
import CompanionCapture4 from "../../assets/source/imgs/accompanycap4.PNG";

const SlideCompanion = () => {
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
        <div className="slide">
          <img className='slide-study' src={CompanionCapture1}></img>
          {/* <div className='slide-solution-title'>스윙 속도 분석</div> */}
        </div>
        <div className="slide">
          <img className='slide-study' src={CompanionCapture2}></img>
          {/* <div className='slide-solution-title'>인식된 관절의 히트맵 및 체형 기반의 타원방정식</div> */}
        </div>
        <div className="slide">
          <img className='slide-study' src={CompanionCapture3}></img>
          {/* <div className='slide-solution-title'>스윙 자세 종합 평가</div> */}
        </div>
        <div className="slide">
          <img className='slide-study' src={CompanionCapture4}></img>
          {/* <div className='slide-solution-title'>Personalized Recommendation</div> */}
        </div>
      </Slider>
    </div>
  );
};

export default SlideCompanion;
