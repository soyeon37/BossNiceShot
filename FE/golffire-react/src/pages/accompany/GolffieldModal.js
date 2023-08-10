import React, { useState } from "react";

import { GrClose } from "react-icons/gr";

function GolffieldModal({ toggleModal, setAccompanyPlace }) {
    const [temporaryPlace, setTemporaryPlace] = useState(0)
    const setAndToggleModal = () => {
        setAccompanyPlace(temporaryPlace);
        toggleModal();
    }

    return (
        <div id='SelectGolffield'>
            <div id='golffield-modal'>
                <div id='modal-header'>
                    <div id="modal-title">
                        골프장 선택
                    </div>
                    <h1><GrClose size={30} onClick={toggleModal} /></h1>
                </div>
                <div id='modal-body' style={{ backgroundColor: "red" }}>
                    <div id='search-box'>
                        {/* <input
                            id="searchWord"
                            defaultValue={searchWord}
                            onChange={handleSearchWord}
                            onKeyDown={handleKeyDown}
                            placeholder="검색어를 입력하세요"
                        />
                        <button id="search-icon" onClick={doSearchWord}>
                            <SearchIcon boxSize={6} />
                        </button> */}
                    </div>

                    <div id='result-box'></div>
                </div>
                <div id='modal-footer'>
                    <button
                        className='modal-button cancel'
                        onClick={toggleModal}>
                        취소
                    </button><button
                        className='modal-button confirm'
                        onClick={setAndToggleModal}>
                        적용
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GolffieldModal;
