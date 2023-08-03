// useGolfDetection.js
import { useEffect } from "react";

export default function FullSwing(
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
  setAnalysisData
) {
  // Define your state variables
  let color = "white";
  let mediaRecorder;
  let recordedChunks = [];
  let isReady = false;
  let isAnalyzing = false;
  let a = 1; // 타원 공식 a값
  let b = 1; // 타원 공식 b값
  let centerX = 1;
  let centerY = 1;
  let initialHipX = 1;
  let initialHipY = 1;
  let initialShoulderX = 1;
  let initialShoulderY = 1;
  let initialHeadX = 1;
  let initialHeadY = 1;
  let initialLeftKneeX = 1;
  let initialLeftKneeY = 1;
  let initialKneeDist = 1;
  let a2 = 1;
  let b2 = 1;

  useEffect(() => {
    let count_time = null;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function(stream) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        video.srcObject = stream;

        // Initialize the MediaRecorder
        mediaRecorder = new MediaRecorder(stream);

        // Define the event handlers
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.onstop = e => {
          handleStop(e, setVideoURL);
          setIsRecordingDone(true); // Set the state to true when the recording stops
        };

        // Load the poseNet model
        window.posenet.load().then(model => {
          // Setup for when the video data is loaded
          video.onloadeddata = e => {
            // Call the predict function when video data is loaded
            console.log("hi");
          };
          // If the video is already loaded, call predict immediately
          if (video.readyState >= 2) {
            console.log("hi");
            predict();
          }

          function predict() {
            //frame이 들어올 때마다 estimate를 하므로 함수화
            model.estimateSinglePose(video).then(pose => {
              canvas.width = video.width; //캔버스와 비디오의 크기를 일치시킴
              canvas.height = video.height;

              // 키포인트와 스켈레톤 그리기
              if (!isReady && !isAnalyzing) {
                drawKeypoints(pose.keypoints, 0.1, context);
                drawSkeleton(pose.keypoints, 0.1, context);
              }

              const isPull = checkIsPull(pose);
              const isPush = checkIsPush(pose);

              if (isReady && !isAnalyzing && b == 1) {
                  const leftShoulder = pose.keypoints[5].position;
                  const rightShoulder = pose.keypoints[6].position;
                  const leftElbow = pose.keypoints[7].position;
                  const rightElbow = pose.keypoints[8].position;
                  const leftWrist = pose.keypoints[9].position;
                  const rightWrist = pose.keypoints[10].position;
                  const leftHip = pose.keypoints[11].position;
                  const rightHip = pose.keypoints[12].position;
                  const nose = pose.keypoints[0].position;
                  const leftKnee = pose.keypoints[13].position;
                  const rightKnee = pose.keypoints[14].position;
          
                  centerX = (leftShoulder.x + rightShoulder.x + leftElbow.x + rightElbow.x) / 4;
                  centerY = (leftShoulder.y + rightShoulder.y + leftElbow.y + rightElbow.y) / 4;
        
                  const currentWristMiddlePointX = (leftWrist.x + rightWrist.x) / 2;
                  const currentWristMiddlePointY = (leftWrist.y + rightWrist.y) / 2;

                  const leftArmLength = Math.sqrt((leftShoulder.x - leftWrist.x)**2 + (leftShoulder.y - leftWrist.y)**2);
                  a = Math.sqrt(1.44 * leftArmLength**2 - (leftShoulder.y - centerY)**2) - Math.abs(centerX - leftShoulder.x);
                  b = Math.sqrt((centerX - currentWristMiddlePointX)**2 + (centerY - currentWristMiddlePointY)**2);

                  initialHipX = (leftHip.x + rightHip.x) / 2;
                  initialHipY = (leftHip.y + rightHip.y) / 2;
                  initialHeadX = nose.x;
                  initialHeadY = nose.y;
                  initialShoulderX = (leftShoulder.x + rightShoulder.x) / 2;
                  initialShoulderY = (leftShoulder.y + rightShoulder.y) / 2;
                  initialLeftKneeX = leftKnee.x;
                  initialLeftKneeY = leftKnee.y;
                  initialKneeDist = Math.sqrt((leftKnee.x - rightKnee.x)**2 + (leftKnee.y - rightKnee.y)**2);

                  // const currentShoulderMiddlePointX = (leftShoulder.x + rightShoulder.x) / 2;
                  // const currentShoulderMiddlePointY = (leftShoulder.y + rightShoulder.y) / 2;

                  // b = Math.abs(currentWristMiddlePointY - currentShoulderMiddlePointY); // 타원 공식 b값
                  // b = Math.abs(rightWrist.y - currentShoulderMiddlePointY);
              }

              // 녹화 시작 조건
              if (
                isReady &&
                isPull &&
                mediaRecorder.state !== "recording" &&
                !isAnalyzing
              ) {
                mediaRecorder.start();
              }

              // 녹화 종료 조건
              if (
                isReady &&
                isPush &&
                mediaRecorder.state === "recording" &&
                !isAnalyzing
              ) {
                mediaRecorder.stop();
                golfStanceSatisfied.current = false;
                golfStanceCount.current = 0;
                isReady = false;
                isAnalyzing = true;
                setIsReady(false);
                setIsAnalyzing(true);
                a2 = a;
                b2 = b;
                b = 1;
                a = 1;
              }

              // 스탠스자세검사 함수 호출
              check_GolfStance(pose);
            });
            requestAnimationFrame(predict); //frame이 들어올 때마다 재귀호출
          }
        });

        count_time = setInterval(function() {
          if (golfStanceSatisfied.current) {
            golfStanceCount.current += 1;

            if (golfStanceCount.current >= 4 && !isReady && !isAnalyzing) {
              // Initialize the MediaRecorder
              const stream = videoRef.current.srcObject;
              mediaRecorder = new MediaRecorder(stream);
              mediaRecorder.ondataavailable = handleDataAvailable;
              mediaRecorder.onstop = e => {
                handleStop(e, setVideoURL);
                setIsRecordingDone(true); // Set the state to true when the recording stops
              };

              isReady = true;
              setIsReady(true);
            }
          }
        }, 1000);
      });

    // Cleanup function
    return () => {
      // Stop the video stream when the component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      // Clear the interval when the component unmounts
      if (count_time) {
        clearInterval(count_time);
      }
    };
  }, [videoRef, canvasRef]); // Execute the effect whenever videoRef or canvasRef changes

  // Define your functions here...
  function handleDataAvailable(e) {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  }

  function handleStop(e, setVideoURL) {
    const blob = new Blob(recordedChunks, {
      type: "video/webm; codecs=vp9"
    });
    recordedChunks = [];

    const videoURL = URL.createObjectURL(blob);
    setVideoURL(videoURL); // Set the video URL in the state

    // Load recorded video for analysis
    loadRecordedVideoForAnalysis(videoURL);

    setIsRecordingDone(true); // Set the state to true when the recording stops
  }

  // 스탠스 자세 인식
  function check_GolfStance(pose) {
    let nose = pose.keypoints[0].position;
    let leftEye = pose.keypoints[1].position;
    let rightEye = pose.keypoints[2].position;
    let leftEar = pose.keypoints[3].position;
    let rightEar = pose.keypoints[4].position;
    let leftShoulder = pose.keypoints[5].position;
    let rightShoulder = pose.keypoints[6].position;
    let leftElbow = pose.keypoints[7].position;
    let rightElbow = pose.keypoints[8].position;
    let leftWrist = pose.keypoints[9].position;
    let rightWrist = pose.keypoints[10].position;
    let leftHip = pose.keypoints[11].position;
    let rightHip = pose.keypoints[12].position;
    let leftKnee = pose.keypoints[13].position;
    let rightKnee = pose.keypoints[14].position;
    let leftAnkle = pose.keypoints[15].position;
    let rightAnkle = pose.keypoints[16].position;

    // 왼쪽 팔꿈치가 왼쪽 어깨 안에 존재
    let elbowsInsideShoulders =
      leftElbow.x < leftShoulder.x + 10 && rightElbow.x + 20 > rightShoulder.x;

    // 두 손목이 두 팔꿈치 사이에 존재
    let wristsInsideElbows =
      rightWrist.x > rightElbow.x &&
      rightWrist.x < leftElbow.x &&
      leftWrist.x > rightElbow.x && leftWrist.x < leftElbow.x;

    // 머리가 두 어깨 사이에 존재
    let headInsideShoulders =
      nose.x > rightShoulder.x && nose.x < leftShoulder.x;

    // 두 손목이 두 힙 밑에 존재
    let wristsBelowHips = rightWrist.y > rightHip.y && leftWrist.y > leftHip.y;

    //두 발목이 두 힙 바깥에 존재
    let anklesOutsideHips =
      rightAnkle.x <= rightHip.x + 15 && leftAnkle.x + 15 >= leftHip.x;

    // 오른쪽 어깨가 왼쪽 어깨 밑에 존재
    let rightShoulderBelowlLeftShoulder = rightShoulder.y >= leftShoulder.y;

    // 모든 조건을 만족할 때 선 색상을 연두색으로 변경
    if (
      elbowsInsideShoulders &&
      wristsInsideElbows &&
      headInsideShoulders &&
      rightShoulderBelowlLeftShoulder
    ) {
      color = "#22ff05";
      golfStanceSatisfied.current = true;
    } else {
      color = "#ffe000";
      golfStanceSatisfied.current = false;
      golfStanceCount.current = 0;
    }
  }

  function checkIsPull(pose) {
    const leftWrist = pose.keypoints[9].position;
    const rightWrist = pose.keypoints[10].position;
    const rightShoulder = pose.keypoints[6].position;
    const leftShoulder = pose.keypoints[5].position;
    const wristMiddlePointX = (leftWrist.x + rightWrist.x) / 2;
    const wristMiddlePointY = (leftWrist.y + rightWrist.y) / 2;
    // return rightWrist.x <= rightShoulder.x; // 쪽팔림 방지용 오른손만 인식
    return (
      wristMiddlePointX <= rightShoulder.x &&
      wristMiddlePointY <= leftShoulder.y
    );
  }

  function checkIsPush(pose) {
    const leftWrist = pose.keypoints[9].position;
    const rightWrist = pose.keypoints[10].position;
    const rightShoulder = pose.keypoints[6].position;
    const leftShoulder = pose.keypoints[5].position;
    const nose = pose.keypoints[0].position;
    const wristMiddlePointX = (leftWrist.x + rightWrist.x) / 2;
    const wristMiddlePointY = (leftWrist.y + rightWrist.y) / 2;
    // return rightWrist.x > leftShoulder.x;  // 쪽팔림 방지용 오른손만 인식
    return (
      wristMiddlePointX >= leftShoulder.x &&
      wristMiddlePointY <= nose.y
    );
  }

  function loadRecordedVideoForAnalysis(videoURL) {
    const recordedVideo = document.createElement("video");
    recordedVideo.src = videoURL;
    recordedVideo.preload = "auto";
    recordedVideo.width = 640;
    recordedVideo.height = 480;
    recordedVideo.playbackRate = 0.1; // Play at half speed
    let totalEllipseCnt = 1;
    let onEllipseCnt = 1;
    let totalHipCnt = 1;
    let onHipCnt = 1;
    let totalHeadCnt = 1;
    let onHeadCnt = 1;
    let totalShoulderCnt = 1;
    let onShoulderCnt = 1;
    let totalKneeCnt = 1;
    let onKneeCnt = 1;
    let analysisResults = [];

    const analysisCanvas = document.createElement("canvas");
    analysisCanvas.width = 640;
    analysisCanvas.height = 480;
    const analysisContext = analysisCanvas.getContext("2d");

    const analysisStream = analysisCanvas.captureStream();
    const analysisMediaRecorder = new MediaRecorder(analysisStream);
    const analysisChunks = [];

    analysisMediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) {
        analysisChunks.push(e.data);
      }
    };

    analysisMediaRecorder.onstop = () => {
      const analysisBlob = new Blob(analysisChunks, {
        type: "video/webm; codecs=vp9"
      });
      const analysisVideoURL = URL.createObjectURL(analysisBlob);
      setAnalysisVideoURL(analysisVideoURL);
      console.log(analysisVideoURL);
    };

    recordedVideo.addEventListener("canplaythrough", () => {
      window.posenet.load().then(model => {
        analysisMediaRecorder.start(); // Start recording the analysis canvas
        recordedVideo.play(); // Start playing the videos
        recordedVideo.addEventListener("timeupdate", () => {
          if (recordedVideo.paused || recordedVideo.ended) return; // Ignore if paused or ended
          model.estimateSinglePose(recordedVideo).then(pose => {
            totalEllipseCnt++;
            const resultArray = analyzePose(pose);
            analysisResults.push(resultArray);
            onEllipseCnt += resultArray[0];
            onHipCnt += resultArray[1];
            onHeadCnt += resultArray[2];
            onShoulderCnt += resultArray[3];
            onKneeCnt += resultArray[4];
            // Draw keypoints and skeleton on the analysis canvas
            drawKeypoints(pose.keypoints, 0.1, analysisContext);
            drawSkeleton(pose.keypoints, 0.1, analysisContext);
          });
        });
        recordedVideo.addEventListener("ended", () => {
          analysisMediaRecorder.stop(); // Stop recording the analysis canvas

          const myEllipseScore = Math.round((onEllipseCnt / totalEllipseCnt) * 100);
          const myHipScore = Math.round((onHipCnt / totalEllipseCnt) * 100);
          const myHeadScore = Math.round((onHeadCnt / totalEllipseCnt) * 100);
          const myShoulderScore = Math.round((onShoulderCnt / totalEllipseCnt) * 100);
          const myKneeScore = Math.round((onKneeCnt / totalEllipseCnt) * 100);
          // console.log(myEllipseScore, myHipScore, myHeadScore, myShoulderScore, myKneeScore);
          setEllipseScore(myEllipseScore);
          setHipScore(myHipScore);
          setHeadScore(myHeadScore);
          setShoulderScore(myShoulderScore);
          setKneeScore(myKneeScore);
          setIsAnalyzing(false);
          setAnalysisData(analysisResults);
          isAnalyzing = false;
        });
      });
    });
  }

  // New function to analyze the pose
  function analyzePose(recordedPose) {
    const leftShoulder = recordedPose.keypoints[5].position;
    const rightShoulder = recordedPose.keypoints[6].position;
    const leftWrist = recordedPose.keypoints[9].position;
    const rightWrist = recordedPose.keypoints[10].position;
    const leftHip = recordedPose.keypoints[11].position;
    const rightHip = recordedPose.keypoints[12].position;
    const nose = recordedPose.keypoints[0].position;
    const rightKnee = recordedPose.keypoints[14].position;
    const HipX = (leftHip.x + rightHip.x) / 2;
    const HipY = (leftHip.y + rightHip.y) / 2;
    const HeadX = nose.x;
    const HeadY = nose.y;
    const ShoulderX = (leftShoulder.x + rightShoulder.x) / 2;
    const ShoulderY = (leftShoulder.y + rightShoulder.y) / 2;
    
    return [
      checkPointOnEllipse(rightWrist.x, rightWrist.y, centerX, centerY, a2, b2),
      checkHip(HipX, HipY),
      checkHead(HeadX, HeadY),
      checkShoulder(ShoulderX, ShoulderY),
      checkKnee(rightKnee.x, rightKnee.y)
    ];
  }

  // New function to check if a point is on the ellipse line
  function checkPointOnEllipse(x, y, h, k, a2, b2) {
    const ellipseFactor = (x - h) ** 2 / a2 ** 2 + (y - k) ** 2 / b2 ** 2;
    if (0.8 <= ellipseFactor && ellipseFactor <= 1.2) return 1;
    return 0;
  }
  function checkHip(HipX, HipY) {
    const dist = Math.sqrt((HipX - initialHipX)**2 + (HipY - initialHipY)**2);
    console.log(dist);
    if (dist <= 20) return 1;
    return 0;
  }
  function checkHead(HeadX, HeadY) {
    const dist = Math.sqrt((HeadX - initialHeadX)**2 + (HeadY - initialHeadY)**2);
    if (dist <= 20) return 1;
    return 0;
  }
  function checkShoulder(ShoulderX, ShoulderY) {
    const dist = Math.sqrt((ShoulderX - initialShoulderX)**2 + (ShoulderY - initialShoulderY)**2);
    if (dist <= 20) return 1;
    return 0;
  }
  function checkKnee(rightKneeX, rightKneeY) {
    const dist = Math.sqrt((rightKneeX - initialLeftKneeX)**2 + (rightKneeY - initialLeftKneeY)**2);
    if (Math.abs(initialKneeDist - dist) <= 20) return 1;
    return 0;
  }

  // tensorflow에서 제공하는 js 파트
  const boundingBoxColor = "white";
  const lineWidth = 3;
  function toTuple({ y, x }) {
    return [y, x];
  }

  function drawPoint(ctx, y, x, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
    ctx.beginPath();
    ctx.moveTo(ax * scale, ay * scale);
    ctx.lineTo(bx * scale, by * scale);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
    const adjacentKeyPoints = window.posenet.getAdjacentKeyPoints(
      keypoints,
      minConfidence
    );
    adjacentKeyPoints.forEach(keypoints => {
      drawSegment(
        toTuple(keypoints[0].position),
        toTuple(keypoints[1].position),
        color,
        scale,
        ctx
      );
    });
  }

  function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
    for (let i = 0; i < keypoints.length; i++) {
      const keypoint = keypoints[i];
      if (keypoint.score < minConfidence) {
        continue;
      }
      const { y, x } = keypoint.position;
      drawPoint(ctx, y * scale, x * scale, 3, color);
    }
  }

  function drawBoundingBox(keypoints, ctx) {
    const boundingBox = window.posenet.getBoundingBox(keypoints);
    ctx.rect(
      boundingBox.minX,
      boundingBox.minY,
      boundingBox.maxX - boundingBox.minX,
      boundingBox.maxY - boundingBox.minY
    );
    ctx.strokeStyle = boundingBoxColor;
    ctx.stroke();
  }
}
