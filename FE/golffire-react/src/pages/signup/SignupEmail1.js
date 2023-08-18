import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setStateStep, setStateEmail } from "../../features/signupSlice";

import axios from "axios";

const SignupEmail1 = () => {
  // Redux
  const dispatch = useDispatch();
  const stateEmail = useSelector((state) => state.signupFeature.email);

  // 이메일 및 인증번호
  const [email, setEmail] = useState("");
  const [userNum, setUserNum] = useState(""); // 사용자 입력 인증번호
  const [verifyNum, setVerifyNum] = useState("TEST"); // 서버로부터 받은 인증번호
  const [verified, setVerified] = useState(false);

  // 이메일 가입 여부 확인 함수
  const handleCheckEmail = () => {
    const data = {
      id: email,
    };
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/members/checkEmail";

    axios
      .post(apiUrl, data)
      .then((response) => {
        if (response.data.data.resultMessage === "FAIL") {
          console.log("이메일이 중복되었습니다.");
          alert("이미 존재하는 이메일입니다.");
        } else {
          console.log("유효한 이메일입니다.");
          handleSendEmail(email);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // 유효 이메일로 인증번호 송신하는 함수
  const handleSendEmail = (email) => {
    const data = {
      id: email,
    };
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/members/sendEmailVerification";

    axios
      .post(apiUrl, data)
      .then((response) => {
        setVerifyNum(response.data.data.certificationNum); // 인증번호
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEmailVerify = () => {
    if (userNum === verifyNum) {
      setVerified(true);
      alert("인증이 완료되었습니다.");
      dispatch(setStateEmail(email));
    } else {
      console.log("인증번호: ", verifyNum);
      alert("인증번호를 다시 확인해 주세요.");
    }
  };

  // '다음으로'
  const handleEmailNext = () => {
    if (verified) {
      dispatch(setStateStep(3));
      // navigate("/signup/email2", { state: { email: email } });
    } else {
      alert("이메일 인증을 먼저 마쳐주세요!");
    }

    // Debug Code !!!
    console.log("email: ", email);
    console.log("userNum: ", userNum);
    console.log("verifyNum: ", verifyNum);
    console.log("verified: ", verified);
  };

  return (
    <div id="SignupEmail1">
      <div className="user-func-context">
        이메일을 인증하세요
      </div>

      <div className="user-email-auth-block">
        <input className="user-email-auth-input"
          type="email"
          value={email}
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)} />
        <button className="user-email-auth-button gr"
          onClick={handleCheckEmail}>전송</button>
      </div>
      <div className="user-email-auth-block">
        <input className="user-email-auth-input"
          type="text"
          value={userNum}
          placeholder="인증 번호 입력"
          onChange={(e) => setUserNum(e.target.value)} />
        <button className="user-email-auth-button wh"
          onClick={handleEmailVerify}>인증</button>
      </div>

      <button className="user-func-email-login"
        onClick={handleEmailNext}>
        <div className="user-only-text">다음으로</div>
      </button>
      <hr className="user-hr" />
      <div className="user-func-footer">
        <NavLink to="/login">
          <div className="user-func-footer-half">돌아가기</div>
        </NavLink>
      </div>

    </div>
  );
};

export default SignupEmail1;
