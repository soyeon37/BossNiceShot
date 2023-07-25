import React from "react";
import { NavLink } from "react-router-dom";

function Signup() {
  return (
    <div id="Signup">
      <div className="title"> 회원가입</div>
      <div>이메일로 가입하기</div>
      <div>카카오톡으로 가입하기</div>
      <hr />
      <NavLink to="/login" style={({ isActive, isPending }) => {
        return {
          fontWeight: isActive ? "bold" : "",
        };
      }}>로그인하기</NavLink>
    </div>
  );
}

export default Signup;
