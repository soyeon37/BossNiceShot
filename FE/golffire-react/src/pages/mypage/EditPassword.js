import React, { useState } from "react";
import MyPageNavbar from "./MyPageNavbar";
import "./MyPage.css";
import axios from "axios";

function EditPassword() {
    const [passOrigin, setPassOrigin] = useState("");
    const [passNew, setPassNew] = useState("");
    const [passCheck, setPassCheck] = useState("");

    // 카카오 계정이면 비밀번호 변경 불가 코드 작성 필요

    // 현재 비밀번호 입력 감지
    const handlePassOrigin = (e) => {
        setPassOrigin(e.target.value);
    };

    // 새 비밀번호 입력 감지
    const handlePassNew = (e) => {
        setPassNew(e.target.value);
    };

    // 비밀번호 확인 입력 감지
    const handlePassCheck = (e) => {
        setPassCheck(e.target.value);
    };

    // 비밀번호 변경 수행
    const handleChangePass = (e) => {
        console.log("passOrigin: ", passOrigin);
        console.log("passNew: ", passNew);
        console.log("passCheck: ", passCheck);
        const apiUrl = 'http://localhost:8080/members/updatePassword'
        const data = {
            passOrigin: passOrigin,
            passNew: passNew
        }
        axios.put(apiUrl, data)
            .then((response) => {
                console.log(response);
                if (response.data.data.resultMessage === "SUCCESS") {
                    alert('비밀번호 변경에 성공했습니다.');
                }
            })
            .catch((error) => {
                console.error(error);
                alert('비밀번호 변경에 실패했습니다.');
            })

    };

    return (
        <div id="MyPage">
            <MyPageNavbar />
            <div id="EditPassword">
                <div id="edit-pic">
                    <div id="pic-circle">
                        큰 사진 들어가는 곳
                    </div>
                    <div>ddd</div>
                </div>
                <div id="edit-pass">
                    <div id="edit-title">
                        비밀번호 변경하기
                    </div>
                    <div id="edit-pass-origin">
                        현재 비밀번호
                        <input
                            id="input-origin"
                            defaultValue={passOrigin}
                            onChange={handlePassOrigin}
                            placeholder="현재 비밀번호를 입력하세요"
                        />
                    </div>
                    <div id="edit-pass-new">
                        새 비밀번호
                        <input
                            id="input-new"
                            defaultValue={passNew}
                            onChange={handlePassNew}
                            placeholder="새 비밀번호를 입력하세요"
                        />
                    </div>
                    <div id="edit-pass-check">
                        비밀번호 확인
                        <input
                            id="input-check"
                            defaultValue={passCheck}
                            onChange={handlePassCheck}
                            placeholder="새 비밀번호를 한 번 더 입력해 주세요"
                        />
                    </div>
                    <button id="edit-button" onClick={handleChangePass}>
                        저장하기
                    </button>
                </div>
            </div>
        </div >
    );
}

export default EditPassword;
