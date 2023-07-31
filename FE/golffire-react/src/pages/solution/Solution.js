import React, { useRef, useState } from 'react';
import useGolfDetection_ from './useGolfDetection_';
import './Solution.css';
import loadingImage from './loading_image.png';

function Solution() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const recordedVideoRef = useRef(null);
    const [isRecordingDone, setIsRecordingDone] = useState(false);
    const [videoURL, setVideoURL] = useState(null);
    const golfStanceSatisfied = useRef(false);
    const golfStanceCount = useRef(0);
    
    useGolfDetection_(videoRef, canvasRef, setIsRecordingDone, setVideoURL, golfStanceSatisfied, golfStanceCount);

    return (
      <div id="Solution">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="live-video-wrapper">
            <video ref={videoRef} id="video" className="live-video" width="640" height="480" autoPlay muted playsInline />  
            <canvas ref={canvasRef} id="canvas"></canvas>
          </div>

          <div className="recorded-video-wrapper">
            {isRecordingDone ? (
              <video src={videoURL} className="recorded-video" width="640" height="480" autoPlay muted playsInline controls />
            ) : (
              <div>
                <div className="recorded-video-placeholder-title">
                측정을 시작하기 위해<br/>
                스탠스 자세를 취하세요
                </div><br/>
                <div className="recorded-video-placeholder-content">
                5초간 바른 스탠스 자세를<br/>
                5초간 유지하시면 솔루셔닝이 시작됩니다.  
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default Solution;
