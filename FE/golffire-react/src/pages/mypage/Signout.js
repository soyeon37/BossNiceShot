import React from "react";
import MyPageNavbar from "./MyPageNavbar";
import "./MyPage.css";
import CryImg from "../../assets/source/mascot/mascot-cry-2.png";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

function Signout() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['refreshToken']);
    const handleLogout = () => {
        console.log('cookies.refreshToken:',cookies.refreshToken);
      
        const apiUrl = 'http://localhost:8080/members/logout'
        const data = {
            refreshToken : cookies.refreshToken
        }
        axios.post(apiUrl, data)
        .then(response => {
            console.log(response);
            if(response.data.data === "SUCCESS"){
                setCookie('refreshToken', cookies.refreshToken, {path: '/', maxAge: 0});
                handleSignout();
            } else {
                alert('Error')
            }
        })
    };
    const handleSignout = (e) => {
        console.log("탈퇴하기");
        const apiUrl = 'http://localhost:8080/members/delete'
        axios.delete(apiUrl)
        .then((response) => {
            console.log(response);
            navigate('/');
        })
        .catch((error)=>{
            console.error(error);
        })
    };


    return (
        <div id="MyPage">
            <MyPageNavbar />
            <div id="Signout">
                <div id="signout-box">
                    <div id="signout-title">
                        탈퇴하기
                    </div>
                    <div id="signout-reason">
                        <div id="reason-radio">
                            탈퇴 사유를 알려주세요.
                        </div>
                        <div id="reason-pic">
                            <img src={CryImg} />
                        </div>
                    </div>
                    <div id="signout-notice">
                        탈퇴하시면 다시 가입 못해요 ~~ 안내문
                    </div>
                    <button id="signout-button" onClick={handleLogout}>
                        탈퇴하기
                    </button>
                </div>
            </div>
        </div >
    );
}

export default Signout;
