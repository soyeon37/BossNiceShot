import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import BackgroundImage from "../../assets/source/imgs/golf-image-1.svg";

function FindPassword() {
  const [email, setEmail] = useState("");

  const handleFindPassword = () => {
    alert("준비중입니다."); // Debug Code

    // 3가지 답변
    // 1. 가입 정보 없다면 -> alert로 없다고 알림
    // 2. 이메일 가입자라면 -> 이메일로 비밀번호 전송 후 alert
    // 3. 카카오톡 가입자라면 -> alert로 카카오톡 가입자라고 알림
  };

  return (
    <div id="FindPassword">
      <div className="user-container">
        <div className="user-banner">
          <div className="user-banner-title">
            동료들이<br />기다리고 있어요!
          </div>
          <div className="user-banner-img">
            <img className="user-banner-img-style" src={BackgroundImage} alt="golf-mascot-image" />
          </div>
        </div>
        <div className="user-func">
          <div className="user-func-title">
            비밀번호 찾기
          </div>
          <div className="user-func-context">
            가입한 이메일을 입력하세요.
            <br />비밀번호 정보를 전송해 드립니다.
          </div>

          <div style={{ height: "100px" }}></div>

          <div className="user-email-auth-block">
            <input
              type="email"
              value={email}
              placeholder="이메일"
              className="user-email-auth-input"
              onChange={(e) => setEmail(e.target.value)}></input>
            <button
              className="user-email-auth-button gr"
              onClick={handleFindPassword}>
              전송
            </button>
          </div>

          <hr className="user-hr" />
          <div className="user-func-footer">
            <NavLink to="/login">
              <div className="user-func-footer-half">돌아가기</div>
            </NavLink>
          </div>
        </div>

        {/* 배경 및 모양 관련 div */}
        <div className="user-container-bump"></div>
      </div>
      <div className="user-container-shadow">
        <div className="user-container-shadow-bump"></div>
      </div>

    </div>
  );
}

export default FindPassword;
