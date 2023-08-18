import React, { useState } from "react";

import { GrClose } from "react-icons/gr";

function ProfilePicModal({ initialPic, initialClr, setImgPic, setImgClr, handleProfilePicModal }) {
    console.log("프로필 모달? ", initialPic, initialClr)
    const values = initialPic.split('_');
    const [color, setColor] = useState(values[0]);
    const [clothes, setClothes] = useState(values[1]);
    const [animal, setAnimal] = useState(values[2]);
    const [curClr, setCurClr] = useState(initialClr);

    // 사진 배경 색상을 map으로 관리
    const colorMap = {
        "red": "#F24141",
        "yellow": "#FFE000",
        "green": "#3BD641",
        "blue": "#80CAFF",
        "white": "#FFFFFF",
    }

    const handleSetProfile = () => {
        setImgPic(color + "_" + clothes + "_" + animal);
        setImgClr(curClr);
        handleProfilePicModal();
    }

    return (
        <div id="ProfilePicModal">
            <div id="follow-modal">
                <div id="modal-header">
                    <div className="modal-title-text">
                        프로필 설정
                    </div>
                    <h1 className="cursor-able">
                        <GrClose size={30} onClick={handleProfilePicModal} />
                    </h1>
                </div>
                <div id="modal-body">

                    <div className="modal-half">
                        <div className="modal-block">
                            <label className="modal-label">모자 색상</label>
                            <select
                                className="modal-select-option"
                                value={color} onChange={(e) => setColor(e.target.value)} >
                                <option value="green">초록색</option>
                                <option value="red">빨간색</option>
                                <option value="yellow">노란색</option>
                            </select>
                        </div>
                        <div className="modal-block">
                            <label className="modal-label">모자</label>
                            <select
                                className="modal-select-option"
                                value={clothes} onChange={(e) => setClothes(e.target.value)} >
                                <option value="suncap">썬캡</option>
                                <option value="cap">야구 모자</option>
                                <option value="hat">버킷 햇</option>
                            </select>
                        </div>
                        <div className="modal-block">
                            <label className="modal-label">동물</label>
                            <select
                                className="modal-select-option"
                                value={animal} onChange={(e) => setAnimal(e.target.value)} >
                                <option value="tiger">호랑이</option>
                                <option value="panda">판다</option>
                                <option value="rabbit">토끼</option>
                                <option value="bear">곰</option>
                            </select>
                        </div>
                        <div className="modal-block">
                            <label className="modal-label">배경 색상</label>
                            <select
                                className="modal-select-option"
                                value={curClr} onChange={(e) => setCurClr(e.target.value)}>
                                <option value="white">흰색 배경</option>
                                <option value="red">빨간색 배경</option>
                                <option value="yellow">노란색 배경</option>
                                <option value="green">초록색 배경</option>
                                <option value="blue">파란색 배경</option>
                            </select>
                        </div>
                    </div>

                    <div className="modal-half">
                        <div className="modal-profile-pic">
                            <div className="user-banner-circle"
                                style={{ backgroundColor: colorMap[curClr] }}>
                                <img className="user-banner-circle-fill"
                                    src={require(`../../assets/source/profile/${color}_${clothes}_${animal}.png`)} />
                            </div>
                        </div>
                    </div>

                </div>
                <div id="pic-modal-footer">
                    {/* 동행 등록 취소 버튼처럼, 가운데 정렬 */}
                    <button
                        className='pic-modal-button modal-cancel'
                        onClick={handleProfilePicModal}>
                        취소
                    </button><button
                        className='pic-modal-button modal-confirm'
                        onClick={handleSetProfile}>
                        적용
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePicModal;
