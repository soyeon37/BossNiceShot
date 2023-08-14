import React from "react";
import HistoryBox from "./HistoryBox";
import { GrClose } from "react-icons/gr";

function ProfileModal({ id, pic, handleUnselect }) {
    console.log("id: ", id);
    console.log("pic: ", pic);

    const personInfo = {
        name: "문싸피",
        backcolor: "#FF7272",
        profilepic: "value from server but never use",
        introduce: "안녕하세요. 제 이름은 문싸피, 반가워요.",
        hitBest: 80,
        hitAvg: 80,
        level: "B",
        tee: "red"
    }

    const scoreHistory = [
        {
            place: "랄라골프장", date: "2023-08-03", score: 80
        }, {
            place: "해피골프장", date: "2023-08-01", score: 80
        }, {
            place: "꿈 꾸는 필드 - 상암점", date: "2023-07-03", score: 80
        }, {
            place: "해피스크린", date: "2023-06-03", score: 80
        }, {
            place: "샷샷샷", date: "2023-05-03", score: 80
        }, {
            place: "드림스크린", date: "2023-02-03", score: 60
        },
    ]

    return (
        <div className="ProfileModal">
            <div id="follow-modal">
                <div id="modal-header">
                    <div id="modal-title">
                        팔로잉 정보
                    </div>
                    <h1 className="cursor-able"><GrClose size={30} onClick={handleUnselect} /></h1>
                </div>
                <div id="modal-body">
                    <div id="modal-info">
                        <div
                            id="modal-info-pic"
                            style={{ backgroundColor: personInfo.backcolor }}>
                            <img
                                className="pic-circle"
                                src={pic}
                                alt={personInfo.name + `님의 프로필`} />
                        </div>
                        <button id="modal-info-button">
                            팔로우 취소
                        </button>
                        <div id="modal-info-context">
                            <div className="context-title">닉네임</div>
                            <div className="context-content">{personInfo.name}</div>
                            <div className="context-title">자기소개</div>
                            <div className="context-content">{personInfo.introduce}</div>
                            <div className="context-divide">
                                <div className="context-half">
                                    <div className="context-title">최고 타수</div>
                                    <div className="context-content">{personInfo.hitBest}</div>
                                </div>
                                <div className="context-half">
                                    <div className="context-title">평균 타수</div>
                                    <div className="context-content">{personInfo.hitAvg}</div>
                                </div>
                            </div>
                            <div className="context-divide">
                                <div className="context-half">
                                    <div className="context-title">레벨</div>
                                    <div className="context-content">{personInfo.level}</div>
                                </div>
                                <div className="context-half">
                                    <div className="context-title">선호 티 박스</div>
                                    <div className="context-content">{personInfo.tee}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="modal-history">
                        <div id="history-title">
                            {personInfo.name}의 스코어
                        </div>
                        <div id="history-list">
                            {scoreHistory.map((history, index) => (
                                <HistoryBox
                                    key={index}
                                    place={history.place}
                                    date={history.date}
                                    score={history.score}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div id="modal-footer">
                    <button
                        id="modal-button"
                        onClick={handleUnselect}>
                        닫기
                    </button>
                </div>
            </div>
        </div >
    );
}

export default ProfileModal;
