import React from "react";
import ErrorImg from "../../assets/source/mascot/404.png";
function ErrorPage() {
  return (
    <div id="error-page">
      <div id="error-page-top">
        <img id="error-page-img" src={ErrorImg}></img>
        <span id="error-page-text">오류가 발생했습니다.</span>
      </div>
      <div id="error-page-bottom">
        <a href="/" >
          <button id="go-main-button">홈 화면으로 돌아가기</button>
        </a>
      </div>
    </div>
  );
}

export default ErrorPage;
