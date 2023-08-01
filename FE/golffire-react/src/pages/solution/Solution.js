import React, { useRef, useState } from 'react';
import useGolfDetection_ from './useGolfDetection_';
import './Solution.css';
import loadingImage from './swing_1.gif';

function Solution() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const recordedVideoRef = useRef(null);
    const [isRecordingDone, setIsRecordingDone] = useState(false);
    const [videoURL, setVideoURL] = useState(null);
    const golfStanceSatisfied = useRef(false);
    const golfStanceCount = useRef(0);
    const [score, setScore] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisVideoURL, setAnalysisVideoURL] = useState(null);

    const liveWrapperClass =
    score !== null && isReady === false && isAnalyzing === false ? 'live-video-wrapper-green' :
    isAnalyzing === true ? 'live-video-wrapper-yellow' :
    isReady === true && isAnalyzing === false ? 'live-video-wrapper-yellow' :
    'live-video-wrapper-red'; // default class

    const recordedWrapperClass =
    score !== null && isReady === false && isAnalyzing === false ? 'recorded-video-wrapper-green' :
    isAnalyzing === true ? 'recorded-video-wrapper-yellow' :
    isReady === true && isAnalyzing === false ? 'recorded-video-wrapper-yellow' :
    'recorded-video-wrapper-red'; // default class

    
    useGolfDetection_(videoRef, canvasRef, setIsRecordingDone, setVideoURL, golfStanceSatisfied, golfStanceCount, setScore, setIsReady, setIsAnalyzing, setAnalysisVideoURL);

    return (
      <div id="Solution">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className={`live-video-wrapper ${liveWrapperClass}`}>
            <video ref={videoRef} id="video" className="live-video" width="640" height="480" autoPlay muted playsInline />  
            <canvas ref={canvasRef} id="canvas"></canvas>
          </div>

          <div className={`recorded-video-wrapper ${recordedWrapperClass}`}>
            {score !== null && isReady === false && isAnalyzing === false ? (
              <>
                <video src={videoURL} className="recorded-video" width="640" height="480" autoPlay muted playsInline controls />
                <br></br>
                <video src={analysisVideoURL} className="recorded-video" width="640" height="480" autoPlay muted playsInline controls />
                <br></br>
                {score !== null && <div className="evaluation">스윙점수  {score}점..</div>}
              </>
            ) : isAnalyzing === true ? (
              <div className="analysis-loading-wrapper">
                <div className="recorded-video-placeholder-title">
                분석중입니다.<br/>
                </div><br></br>
                <div className="recorded-video-placeholder-content">
                분석이 완료될때까지 잠시 기다려주세요.
                </div><br></br>
                <img src={loadingImage} alt="Loading..." className="loading-image" />
              </div>
            ) : isReady === true && isAnalyzing === false ? (
              <div>
                <div className="recorded-video-placeholder-title">
                스윙 하세요!<br/>
                </div><br/><br/>
                <div className="recorded-video-placeholder-content">
                양손이 우측 어깨 상단에 위치할 수 있게 당겨주시고<br/>
                좌측 어깨 상단에 갈 수 있게 릴리즈 해주세요.  
                </div>
              </div>
            ) : (
              <div>
                <div className="recorded-video-placeholder-title">
                측정을 시작하기 위해<br/>
                스탠스 자세를 취하세요
                </div><br/><br/>
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
