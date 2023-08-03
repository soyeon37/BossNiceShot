import React, { useState } from 'react';
import { BsPenFill, BsFillEraserFill, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import './study.css'; 

function DrawingTools({ onSelectTool, onColorChange, isCanvasVisible, toggleCanvasVisibility }) {
  const [selectedColor, setSelectedColor] = useState('black'); // 초기 색상은 검정색으로 설정

  const handleColorChange = (color) => {
    setSelectedColor(color);
    onColorChange(color); // 선택한 색상을 부모 컴포넌트로 전달console.log("색상변경")
  };

  return (
    <div className="drawing-tools">
      {/* 여기에 그림판 도구 선택 아이콘 등을 추가합니다 */}
      <button onClick={() => onSelectTool('pen')}>
        <BsPenFill style={{ color: 'black' }}/> 
      </button>
      <button onClick={() => onSelectTool('eraser')}>
        <BsFillEraserFill style={{ color: 'black' }}/> 
      </button>
      <div className="color-picker">
        {/* 색상 선택 UI */}
        <label>
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </label>
      </div>
      <button onClick={toggleCanvasVisibility}>
        {isCanvasVisible ? <BsEyeFill style={{ color: 'black' }}/> : <BsEyeSlashFill style={{ color: 'black' }}/>}
      </button>
    </div>
  );
}

export default DrawingTools;