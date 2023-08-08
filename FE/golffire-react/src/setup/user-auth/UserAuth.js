import axios from "axios";

// 토큰 재발급 함수
export function reissueToken({ cookies, setCookie, removeCookie, navigate }) {
    console.log('refrshToken:', cookies.refresh_token);
    const apiUrl = process.env.REACT_APP_SERVER_URL  + '/members/reissue';
    axios.post(apiUrl, cookies.refresh_token, { headers: { 'Authorization': 'Bearer ' + cookies.access_token } })
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

export function handleLogout(cookies, setCookie, navigate) {
    console.log('cookies.refreshToken:', cookies.refreshToken);
    const apiUrl = process.env.REACT_APP_SERVER_URL + '/members/logout';
    const data = {
        refreshToken: cookies.refreshToken
    }
    axios.post(apiUrl, data)
        .then(response => {
            console.log(response);
            if (response.data.data === "SUCCESS") {
                setCookie('refreshToken', cookies.refreshToken, { path: '/', maxAge: 0 });
                navigate('/');
            } else {
                alert('Error');
                navigate("/error");
            }
        })
}
