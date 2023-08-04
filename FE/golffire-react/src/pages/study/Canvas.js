import React, { useRef, useEffect } from 'react';
import './study.css'; 

function Canvas({  selectedTool, isCanvasVisible, drawColor }) {
  const canvasRef = useRef(null);
  let isDrawing = false;
  let prevX, prevY;


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round'; 
    ctx.lineJoin = 'round'; 
  }, [drawColor]);

  const getCanvasCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    return { x, y };
  };

  const handleMouseDown = (event) => {
    const { x, y } = getCanvasCoordinates(event);
    isDrawing = true;
    prevX = x;
    prevY = y;
  };

  const handleMouseMove = (event) => {
    if (!isDrawing) return;
    const { x, y } = getCanvasCoordinates(event);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    if (selectedTool === 'pen') {
      ctx.strokeStyle = drawColor; 
      ctx.lineWidth = 2;
      ctx.globalCompositeOperation = 'source-over'; // 그리기 모드
    } else if (selectedTool === 'eraser') {
      ctx.strokeStyle = 'white'; 
      ctx.lineWidth = 10;  // (크기 조정)
      ctx.globalCompositeOperation = 'destination-out'; // 지우개 모드
    }
    ctx.stroke();

    prevX = x;
    prevY = y;
  };

  const handleMouseUp = () => {
    isDrawing = false;
  };

  return (
    <div className={`canvas-container ${isCanvasVisible ? '' : 'hide'}`}>
      <canvas
        className="canvas"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
}

export default Canvas;