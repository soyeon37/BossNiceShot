import React, { useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setStateStep, setStatePassword } from "../../features/signupSlice";

const SignupEmail2 = () => {
  // Redux
  const dispatch = useDispatch();
  const stateEmail = useSelector((state) => state.signupFeature.email);

  const [email, setEmail] = useState(stateEmail);
  const [password, setPassword] = useState("");
  const [passwordVer, setPasswordVer] = useState("");

  const handleEmailSetPassword = () => {
    // Debug Code !!!
    console.log("email: ", email);
    console.log("password: ", password);
    console.log("passwordVer: ", passwordVer);

    if (!verifyPassword(password)) {
      alert("유효한 비밀번호를 입력해 주세요!");
    } else if (password !== passwordVer) {
      alert("비밀번호를 확인해 주세요!");
    } else {
      dispatch(setStatePassword(password));
      dispatch(setStateStep(4));
    }
  };

  const verifyPassword = (password) => {
    // return true; // Debug Code !!!

    const hasUpperCase = /[A-Z]/.test(password); // 대문자 포함
    const hasLowerCase = /[a-z]/.test(password); // 소문자 포함
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password); // 특수 문자 포함
    const isLengthValid = password.length >= 8; // 8자 이상

    return hasUpperCase && hasLowerCase && hasSpecialChar && isLengthValid;
  }

  return (
    <div id="SignupEmail2">

      <div className="user-func-context">
        비밀번호를 입력하세요
      </div>
      <input
        type="email"
        defaultValue={email}
        aria-readonly
        className="user-func-normal-input" />
      <input className="user-func-normal-input"
        type="password"
        value={password}
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)} />
      <input className="user-func-normal-input"
        type="password"
        value={passwordVer}
        placeholder="비밀번호 확인"
        onChange={(e) => setPasswordVer(e.target.value)} />
      <div className="user-func-input-guide">
        비밀번호는 영어 대문자, 소문자, 특수문자를 포함한 8자 이상이어야 합니다.
      </div>

      {/* 개인정보 약관 */}

      <button className="user-func-email-login"
        onClick={handleEmailSetPassword}>
        <div className="user-only-text">다음으로</div>
      </button>

    </div>
  );
};

export default SignupEmail2;
