import React, { useRef, useState, useEffect } from "react";
import HalfSwing from "./HalfSwing";
import "./Solution.css";
import loadingImage from "./swing_1.gif";
import { color } from "framer-motion";

function Solution_HalfSwing() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const recordedVideoRef = useRef(null);
  const [isRecordingDone, setIsRecordingDone] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const golfStanceSatisfied = useRef(false);
  const golfStanceCount = useRef(0);
  const [myEllipseScore, setEllipseScore] = useState(null);
  const [myHipScore, setHipScore] = useState(null);
  const [myHeadScore, setHeadScore] = useState(null);
  const [myShoulderScore, setShoulderScore] = useState(null);
  const [myKneeScore, setKneeScore] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisVideoURL, setAnalysisVideoURL] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // State to keep track of the current page
  const [analysisData, setAnalysisData] = useState([]);
  const [coordinateData, setCoordinateData] = useState([]);
  const canvasCoordinatesRef = useRef(null);

  // Function to change the current page
  const changePage = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === "next" && prevPage < 4) return prevPage + 1;
      if (direction === "prev" && prevPage > 0) return prevPage - 1;
      return prevPage;
    });
  };
  
  useEffect(() => {
    if (coordinateData.length > 0 && currentPage === 3) {
      drawCoordinates(coordinateData);
    }
  }, [coordinateData, currentPage]);

  const liveWrapperClass =
  myEllipseScore !== null && isReady === false && isAnalyzing === false
      ? "live-video-wrapper-green"
      : isAnalyzing === true
      ? "live-video-wrapper-yellow"
      : isReady === true && isAnalyzing === false
      ? "live-video-wrapper-yellow"
      : "live-video-wrapper-red"; // default class

  const recordedWrapperClass =
  myEllipseScore !== null && isReady === false && isAnalyzing === false
      ? "recorded-video-wrapper-green"
      : isAnalyzing === true
      ? "recorded-video-wrapper-yellow"
      : isReady === true && isAnalyzing === false
      ? "recorded-video-wrapper-yellow"
      : "recorded-video-wrapper-red"; // default class

  HalfSwing(
    videoRef,
    canvasRef,
    setIsRecordingDone,
    setVideoURL,
    golfStanceSatisfied,
    golfStanceCount,
    setEllipseScore,
    setHipScore,
    setHeadScore,
    setShoulderScore,
    setKneeScore,
    setIsReady,
    setIsAnalyzing,
    setAnalysisVideoURL,
    setAnalysisData,
    setCoordinateData
  );

  return (
    <div id="Solution">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={`live-video-wrapper ${liveWrapperClass}`}>
          <video
            ref={videoRef}
            id="video"
            className="live-video-halfswing"
            width="640"
            height="480"
            autoPlay
            muted
            playsInline
          />
          <canvas ref={canvasRef} id="canvas"></canvas>
          <div className="live-video-buttons">
            
            <div className={myEllipseScore === null && !isReady && !isAnalyzing ? "live-button-red" : "live-button-gray"}>READY</div>
            <div className={isReady && !isAnalyzing ? "live-button-yellow" : "live-button-gray"}>SWING</div>
            <div className={isAnalyzing ? "live-button-yellow" : "live-button-gray"}>ANLYZ</div>
            <div className={myEllipseScore !== null && !isReady && !isAnalyzing ? "live-button-green" : "live-button-gray"}>FINISH</div>


          </div>
        </div>

        <div className={`recorded-video-wrapper ${recordedWrapperClass}`}>
          {myEllipseScore !== null && isReady === false && isAnalyzing === false ? (
            <>
              {currentPage === 0 && (
                <video
                  src={videoURL}
                  className="recorded-video"
                  width="500"
                  height="375"
                  autoPlay
                  muted
                  playsInline
                  controls
                />
              )}
              {currentPage === 1 && (
                <video
                  src={analysisVideoURL}
                  className="recorded-video"
                  width="500"
                  height="375"
                  autoPlay
                  muted
                  playsInline
                  controls
                />
              )}
              {currentPage === 2 && (
                <>
                  <div className="evaluation" style={{fontSize:"20px", color:"#99a1a8", marginTop:"10px", marginBottom:"15px"}}>올바른 자세 및 경로에 있는 비율을 명시합니다</div>
                  <div className="evaluation">SWING &nbsp;{myEllipseScore}%</div>
                  <div className="evaluation">HEAD &nbsp;{myHeadScore}%</div>
                  <div className="evaluation">SHOULDER &nbsp;{myShoulderScore}%</div>
                  <div className="evaluation">HIP &nbsp;{myHipScore}%</div>
                  <div className="evaluation">KNEE &nbsp;{myKneeScore}%</div>
                  <div className="evaluationAvg">AVG &nbsp;{(myEllipseScore + myHeadScore + myShoulderScore + myHipScore + myKneeScore) / 5}%</div>
                </>
              )}
              {currentPage === 3 && (
                <>
                  <div className="analysis-container">
                    <div className="analysis-row">
                      <label className="analysis-label">Swing</label>
                      {analysisData.map((result, index) => (
                        <div
                          key={index}
                          className={`analysis-block ${result[0] === 1 ? 'green' : 'red'}`}
                        ></div>
                      ))}
                    </div>
                    <div className="analysis-row">
                      <label className="analysis-label">Head</label>
                      {analysisData.map((result, index) => (
                        <div
                          key={index}
                          className={`analysis-block ${result[2] === 1 ? 'green' : 'red'}`}
                        ></div>
                      ))}
                    </div>
                    <div className="analysis-row">
                      <label className="analysis-label">Shoulder</label>
                      {analysisData.map((result, index) => (
                        <div
                          key={index}
                          className={`analysis-block ${result[3] === 1 ? 'green' : 'red'}`}
                        ></div>
                      ))}
                    </div>
                    <div className="analysis-row">
                      <label className="analysis-label">Hip</label>
                      {analysisData.map((result, index) => (
                        <div
                          key={index}
                          className={`analysis-block ${result[1] === 1 ? 'green' : 'red'}`}
                        ></div>
                      ))}
                    </div>
                    <div className="analysis-row">
                      <label className="analysis-label">Knee</label>
                      {analysisData.map((result, index) => (
                        <div
                          key={index}
                          className={`analysis-block ${result[4] === 1 ? 'green' : 'red'}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <canvas className="coordinatesDiv" id="coordinatesCanvas" width="476" height="357"></canvas>
                </>
              )}
              {currentPage === 4 && (
                <div className="coordinatesRawDiv">
                  <div className="coordinatesContainer">
                    <table>
                      <thead>
                        <tr>
                          <th>Frame</th>
                          <th>Point</th>
                          <th>X</th>
                          <th>Y</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coordinateData.map((frame, frameIndex) =>
                          frame.map((keypoint, pointIndex) => (
                            <tr key={`${frameIndex}-${pointIndex}`}>
                              <td>{frameIndex}</td>
                              <td>{pointIndex}</td>
                              <td>{keypoint.position.x}</td>
                              <td>{keypoint.position.y}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              <div className="pagination-buttons">
                <button disabled={currentPage === 0} onClick={() => changePage("prev")}>
                  PREV
                </button>
                <button disabled={currentPage === 4} onClick={() => changePage("next")}>
                  NEXT
                </button>
              </div>
              
            </>
          ) : isAnalyzing === true ? (
            <div className="analysis-loading-wrapper">
              <div className="recorded-video-placeholder-title">
                분석중입니다.
                <br />
              </div>
              <br></br>
              <div className="recorded-video-placeholder-content">
                분석이 완료될때까지 잠시 기다려주세요.
              </div>
              <br></br>
              <img
                src={loadingImage}
                alt="Loading..."
                className="loading-image"
              />
            </div>
          ) : isReady === true && isAnalyzing === false ? (
            <div>
              <div className="recorded-video-placeholder-title">
                스윙 하세요!
                <br />
              </div>
              <br />
              <br />
              <div className="recorded-video-placeholder-content">
                양손이 우측 어깨 상단에 <br></br>
                위치할 수 있게 당겨주시고<br></br>
                좌측 어깨 상단에 갈 수 있게<br></br>
                릴리즈 해주세요.
              </div>
            </div>
          ) : (
            <div>
              <div className="recorded-video-placeholder-title">
                측정을 시작하기 위해
                <br />
                스탠스 자세를 취하세요
              </div>
              <br />
              <br />
              <div className="recorded-video-placeholder-content">
                5초간 올바른 스탠스 자세를
                <br />
                유지하시면 솔루셔닝이 시작됩니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function drawCoordinates(coordinateData) {
    const canvas = document.getElementById('coordinatesCanvas');
    const ctx = canvas.getContext('2d');
  
    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Set the scaling factors
    const scaleX = 0.5;
    const scaleY = 0.5;
  
    // Apply the scaling
    ctx.scale(scaleX, scaleY);

    // Optional: Apply a translation to center the drawing (adjust values as needed)
    ctx.translate(canvas.width * 0.3, canvas.height * 0.3);

    // Iterate through each frame's data
    coordinateData.forEach((frame, frameIndex) => {
      // Iterate through each keypoint in the frame
      frame.forEach((keypoint, pointIndex) => {
        const { x, y } = keypoint.position;
  
        // Draw the point
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(52, 235, 58, 0.2)';
        ctx.fill();
  
        // Draw a line to the next point if it's not the first frame and the point is a wrist
        if (frameIndex > 0 && (pointIndex === 9 || pointIndex === 10)) {
          const prevPoint = coordinateData[frameIndex - 1][pointIndex].position;
          ctx.beginPath();
          ctx.moveTo(prevPoint.x, prevPoint.y);
          ctx.lineTo(x, y);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 5;
          ctx.stroke();
        }
      });
    });
  
    // Reset the scaling after drawing
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export default Solution_HalfSwing;
