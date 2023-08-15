import React from "react";
import AccompanyList from "./AccompanyList";

import { useNavigate } from 'react-router-dom';

import PinImg from "../../assets/source/icons/pin.png";
import "./accompany.css";

function Accompany() {
  const navigate = useNavigate();

  return (
    <div id="accompany-container" className="container">
      <div className="container-head">
        <div className="container-head-title" onClick={() => { navigate('/accompany'); }}>동행</div>
        <div className="container-head-desc">
          원하는 날짜와 장소에 같이 갈 동행을 구해보아요.
        </div>
        
        <img className="list-head-pin" src={PinImg} alt="pin" />
        <div className="list-head-shadow bg-accompany"></div>
      </div>

      <div className="container-body">
        <AccompanyList />
      </div>
    </div>
  );
}

export default Accompany;
