import axios from "axios";

// 토큰 재발급 함수
export function reissueToken({ refreshToken, setCookie, removeCookie, navigate }) {
  console.log("전달받은 refrshToken:", refreshToken);
  const apiUrl = process.env.REACT_APP_SERVER_URL  + '/api/members/reissue';
  const headers = {
    "Content-Type": `application/json`,
    refreshToken: refreshToken,
  };

  axios
    .get(apiUrl, {
      headers: headers,
    })
    .then((response) => {
      const message = response.data.data.message;
      if (message === "SUCCESS") {
        const newAccessToken = response.data.data.accessToken;
        console.log("새 access 토큰: ", newAccessToken);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        removeCookie("access_token");
        console.log("엑세스 토큰 연장 성공");
        return true;
      } else {
        console.log("EXPIRED_TOKEN_MESSAGE: ", message);
        // 로그아웃 시켜주는 func 실행
        console.log("리프레시 토큰 만료됨 -> 로그아웃");
        return false;
      }
    })
    .catch((error) => {
      console.error("토큰 재발급 중 Error:", error); // Debug Code
      return false;
    });
  return false;
}

// 로그아웃 처리 함수
export function handleLogout(refreshToken, setCookie, navigate) {
  console.log("로그아웃에서의 refreshToken:", refreshToken);
  const apiUrl = process.env.REACT_APP_SERVER_URL + '/api/members/logout';
  const data = {
    refreshToken: refreshToken,
  };
  axios.post(apiUrl, data).then((response) => {
    console.log(response);
    if (response.data.data === "SUCCESS") {
      setCookie("refreshToken", refreshToken, { path: "/", maxAge: 0 });
      console.log("로그아웃 처리 성공");
      navigate("/");
    } else {
      alert("Error");
      console.log("로그아웃 처리 실패");
      navigate("/error");
    }
  });
}
