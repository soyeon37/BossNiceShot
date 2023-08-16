import axios from "axios";

// 토큰 재발급 함수
export function reissueToken({ cookies, refreshToken, setCookie, removeCookie, navigate }) {
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
        console.log("UserAuth - reissueToken; ", newAccessToken);
        removeCookie('access_token');
        setCookie('access_token', newAccessToken, { path: '/' });
        return true;
      } else {
        console.log('EXPIRED_TOKEN_MESSAGE: ', message);
        handleLogout(cookies = { cookies }, setCookie = { setCookie }, navigate = { navigate });
        return false;
      }
    })
    .catch((error) => {
      console.error('Error:', error); // Debug Code
      return false;
    });
}

// 로그아웃 처리 함수
export function handleLogout(cookies, refreshToken, setCookie, navigate) {
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
