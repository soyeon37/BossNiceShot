import React from "react";
import { NavLink } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { setStateStep } from "../../features/signupSlice";

import { IoMailOutline, IoChatbubbleSharp } from "react-icons/io5";

function SignupChoice() {
  // Redux
  const dispatch = useDispatch();

  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_SERVER_URL + "/auth/kakao/signup/callback";
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const selectEmailSignup = () => {
    dispatch(setStateStep(2));
  };
  const selectKakaoSignup = () => {
    // console.log("카카오 로그인"); // Debug !!
    window.location.href = kakaoUrl;
    // dispatch(setStateStep(4));
  };

  return (
    <div id="SignupChoice">

      <button
        className="user-func-email-login"
        onClick={selectEmailSignup} >
        <IoMailOutline className="button-react-icon" />
        <div className="user-button-text">회원가입</div>
      </button>
      <button
        className="user-func-kakao-login"
        onClick={selectKakaoSignup} >
        <IoChatbubbleSharp className="button-react-icon" />
        <div className="user-button-text">카카오톡으로 회원가입</div>
      </button>
      <hr className="user-hr" />
      <div className="user-func-footer">
        <NavLink to="/login">
          <div className="user-func-footer-half">로그인하기</div>
        </NavLink>
      </div>

    </div>
  );
}

export default SignupChoice;
