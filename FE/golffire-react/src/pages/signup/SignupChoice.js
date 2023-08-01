import React from "react";
import { NavLink } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { setStateStep } from "../../features/signupSlice";

function SignupChoice() {
  // Redux
  const dispatch = useDispatch();

  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:3000/auth/kakao/signup/callback";
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
      <div className="title">
        <h1>회원가입</h1>
      </div>
      <div>
        {/* <NavLink to="/signup/email1"> */}
        <button
          onClick={selectEmailSignup}
          style={{
            height: "2.5rem",
            width: "100%",

            color: "black",
            borderRadius: "30px",
            background: "#FFFFFF",
          }}
        >
          이메일로 가입하기
        </button>
        {/* </NavLink> */}
      </div>
      <div>
        <button
          onClick={selectKakaoSignup}
          style={{
            height: "2.5rem",
            width: "100%",

            color: "black",
            borderRadius: "30px",
            background: "#FFF500",
          }}
        >
          카카오톡으로 가입하기
        </button>
      </div>
      <hr />
      {/* NavBar Bold 적용 불가한 문제 발생 */}
      <NavLink to="/login">로그인하기</NavLink>
    </div>
  );
}

export default SignupChoice;
