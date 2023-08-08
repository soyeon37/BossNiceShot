import React, { useEffect, useState } from 'react'
import DrawingTools from './DrawingTools';
import Canvas from './Canvas';
import SplideCam from './SplideCam';

import "./study.css";

function CoachingRoom() {
  const [selectedTool, setSelectedTool] = useState('pen')
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);
  const [drawColor, setDrawColor] = useState('black');
  const handleCanvasVisibilityChange = () => {
    setIsCanvasVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    // 스크롤 방지
    document.body.style.overflow = 'hidden';
    // 컴포넌트 언마운트 시 스크롤 다시 활성화
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const CopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("URL이 복사되었습니다")
    });
  };

  const goBack = () => {
    window.history.go(-1);
  }

  const handleSelectTool =  (tool) => {
    setSelectedTool(tool);
    setIsCanvasVisible(true);
  }

  const handleColorChange = (color) => {
    setDrawColor(color);
  };

  const handleTestButtonClick = () => {
    // 테스트 버튼 클릭 시 원하는 동작을 처리하도록 하세요.
    console.log("테스트 버튼이 클릭되었습니다!");
  };

  return (
    <div className="coachingroom-container">
      <div className="box-head">
        <div className="box-roomtype">
          <span className="typename">코칭</span>
        </div>
        방 제목
        <div className="copy-url" onClick={CopyUrl}></div>
        <div className="go-back" onClick={goBack}></div>

      </div>
      <div className="box-body">
        <div className="grid-item item1">
          {/* 러닝룸에서 포함 시킬 것. <div className="coachcam">코치</div> */ }
          <div className="mycam">나</div>
        </div>
        <div className="grid-item item2">
          <div className="box-splide">
            <SplideCam />
          </div>
          <div className="box-mainrtc">
              {/* Canvas 컴포넌트 */}
            {isCanvasVisible && (
              <Canvas selectedTool={selectedTool} isCanvasVisible={isCanvasVisible} drawColor={drawColor} />
            )}
            나는 화면공유
            <button onClick={handleTestButtonClick}>테스트</button>
          </div>
          {/* 그림판 기능 선택 컴포넌트 */}
          <DrawingTools 
            onSelectTool={handleSelectTool}
            onColorChange={handleColorChange}
            isCanvasVisible={isCanvasVisible}
            toggleCanvasVisibility={handleCanvasVisibilityChange}
          />
        </div>
        <div className="grid-item item3">
          <div className="box-chatview">나는 채팅방</div>
          <div className="box-chatinput">나는 채팅 입력창</div>
        </div>
      </div>
    </div>
  )
}

export default CoachingRoom