// useGolfDetection.js
import { useEffect } from 'react';

export default function useGolfDetection_(videoRef, canvasRef, setIsRecordingDone, setVideoURL, golfStanceSatisfied, golfStanceCount) {
    // Define your state variables
    let color = "white";
    let mediaRecorder;
    let recordedChunks = [];
    let isReady = false;
    let initialShoulderMiddlePointX = 0;
    let initialShoulderMiddlePointY = 0;
    let initialWristMiddlePointX = 0;
    let initialWristMiddlePointY = 0;
    let a = 1; // 타원 공식 a값
    let b = 1; // 타원 공식 b값

    useEffect(() => {
        let count_time = null;


        navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(function (stream) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            video.srcObject = stream;

            // Initialize the MediaRecorder
            mediaRecorder = new MediaRecorder(stream);
            
            // Define the event handlers
            mediaRecorder.ondataavailable = handleDataAvailable;
            mediaRecorder.onstop = (e) => {
                handleStop(e, setVideoURL);
                setIsRecordingDone(true); // Set the state to true when the recording stops
            };

            // Load the poseNet model
            window.posenet.load().then((model) => {
                // Setup for when the video data is loaded
                video.onloadeddata = (e) => {
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
                    model.estimateSinglePose(video).then((pose) => {
                        canvas.width = video.width; //캔버스와 비디오의 크기를 일치시킴
                        canvas.height = video.height;

                        // 키포인트와 스켈레톤 그리기
                        drawKeypoints(pose.keypoints, 0.6, context);
                        drawSkeleton(pose.keypoints, 0.6, context);

                        // const isReady = golfStanceSatisfied.current && golfStanceCount.current >= 5;
                        const isPull = checkIsPull(pose);
                        const isPush = checkIsPush(pose);
                        
                        if (isReady) {
                            context.beginPath();
                            context.arc(50, 50, 20, 0, 2 * Math.PI, false);
                            context.fillStyle = 'red';
                            context.fill();

                            if (b == 1) {
                                const leftShoulder = pose.keypoints[5].position;
                                const rightShoulder = pose.keypoints[6].position;
                                const leftWrist = pose.keypoints[9].position;
                                const rightWrist = pose.keypoints[10].position;
                                const currentShoulderMiddlePointY = (leftShoulder.y + rightShoulder.y) / 2;
                                const currentWristMiddlePointY = (leftWrist.y + rightWrist.y) / 2;

                                b = Math.abs(currentWristMiddlePointY - currentShoulderMiddlePointY); // 타원 공식 b값
                            }
                        }

                        // 녹화 시작 조건
                        if (isReady && isPull && mediaRecorder.state !== "recording") {
                            mediaRecorder.start();

                            const leftShoulder = pose.keypoints[5].position;
                            const rightShoulder = pose.keypoints[6].position;
                            const leftWrist = pose.keypoints[9].position;
                            const rightWrist = pose.keypoints[10].position;
                            
                            initialShoulderMiddlePointX = (leftShoulder.x + rightShoulder.x) / 2;
                            initialShoulderMiddlePointY = (leftShoulder.y + rightShoulder.y) / 2;
                            initialWristMiddlePointX = (leftWrist.x + rightWrist.x) / 2;
                            initialWristMiddlePointY = (leftWrist.y + rightWrist.y) / 2;

                            a = Math.abs(initialWristMiddlePointX - initialShoulderMiddlePointX); // 타원공식의 a값
                        }

                        // 녹화 종료 조건
                        if (isReady && isPush && mediaRecorder.state === "recording") {
                            mediaRecorder.stop();
                            golfStanceSatisfied.current = false;
                            golfStanceCount.current = 0;
                            isReady = false;
                            // b = 1;
                            // a = 1;
                        }

                        // 스탠스자세검사 함수 호출
                        check_GolfStance(pose);  
                    });
                    requestAnimationFrame(predict); //frame이 들어올 때마다 재귀호출
                }
            });


            count_time = setInterval(function () {
                if (golfStanceSatisfied.current) {
                    golfStanceCount.current += 1;
            
                    if (golfStanceCount.current >= 5 && isReady === false) {

                        // Initialize the MediaRecorder
                        const stream = videoRef.current.srcObject;
                        mediaRecorder = new MediaRecorder(stream);
                        mediaRecorder.ondataavailable = handleDataAvailable;
                        mediaRecorder.onstop = (e) => {
                            handleStop(e, setVideoURL);
                            setIsRecordingDone(true); // Set the state to true when the recording stops
                        };

                        isReady = true;
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
            type: 'video/webm; codecs=vp9'
        });
        recordedChunks = [];
    
        const videoURL = URL.createObjectURL(blob);
        setVideoURL(videoURL); // Set the video URL in the state

        // Load recorded video for analysis
        loadRecordedVideoForAnalysis(videoURL);

        setIsRecordingDone(true); // Set the state to true when the recording stops
    }
    
    
    function check_GolfStance(pose) {
    
        // point 추출
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
        let elbowsInsideShoulders = (leftElbow.x < leftShoulder.x + 10) && (rightElbow.x + 20 > rightShoulder.x);
    
        // 두 손목이 두 팔꿈치 사이에 존재
        let wristsInsideElbows = (rightWrist.x > rightElbow.x && rightWrist.x < leftElbow.x) 
                                    && (leftWrist.x > rightElbow.x && leftWrist.x < leftElbow.x);
    
        // 머리가 두 어깨 사이에 존재
        let headInsideShoulders = nose.x > rightShoulder.x && nose.x < leftShoulder.x;
    
        // 두 손목이 두 힙 밑에 존재
        let wristsBelowHips = rightWrist.y > rightHip.y && leftWrist.y > leftHip.y;
    
        //두 발목이 두 힙 바깥에 존재
        let anklesOutsideHips = (rightAnkle.x <= rightHip.x + 15) 
                                    && (leftAnkle.x + 15 >= leftHip.x);
    
        // 오른쪽 어깨가 왼쪽 어깨 밑에 존재
        let rightShoulderBelowlLeftShoulder = (rightShoulder.y >= leftShoulder.y);
                                    
    
        // 모든 조건을 만족할 때 선 색상을 연두색으로 변경
        if(elbowsInsideShoulders && wristsInsideElbows && headInsideShoulders  && rightShoulderBelowlLeftShoulder) {
            // console.log("골프 스탠스 자세 완료");
            color = "#4dff94";
            golfStanceSatisfied.current = true;
    
        } else {
            // console.log("스탠스 자세를 취해주세요");
            color = "white";
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

        // return rightWrist.x < rightShoulder.x;
        return wristMiddlePointX <= rightShoulder.x && wristMiddlePointY <= leftShoulder.y;
    }

    function checkIsPush(pose) {
        const leftWrist = pose.keypoints[9].position;
        const rightWrist = pose.keypoints[10].position;
        const rightShoulder = pose.keypoints[6].position;
        const leftShoulder = pose.keypoints[5].position;

        const wristMiddlePointX = (leftWrist.x + rightWrist.x) / 2;
        const wristMiddlePointY = (leftWrist.y + rightWrist.y) / 2;

        // return rightWrist.x > leftShoulder.x;
        return wristMiddlePointX >= leftShoulder.x && wristMiddlePointY <= rightShoulder.y;
    }

    function loadRecordedVideoForAnalysis(videoURL) {
        const recordedVideo = document.createElement('video');
        recordedVideo.src = videoURL;
        recordedVideo.preload = 'auto'; // Preload the video
        recordedVideo.width = 640; // Adjust the width to match your video
        recordedVideo.height = 480; // Adjust the height to match your video
    
        // Wait for the video to be ready to play
        recordedVideo.addEventListener('canplay', () => {
            window.posenet.load().then((model) => {
                recordedVideo.play();
                function analyzeFrame() {
                    model.estimateSinglePose(recordedVideo).then((pose) => {
                        analyzePose(pose);
                        
                        if (!recordedVideo.paused && !recordedVideo.ended) {
                            requestAnimationFrame(analyzeFrame); // Continue analyzing next frame
                        }
                    });
                }
                analyzeFrame(); // Start analyzing frames
            });
        });

        a = 1;
        b = 1;
    }
        
    //     // recordedVideo.onloadeddata = () => {
    //     //     window.posenet.load().then((model) => {
    //     //         recordedVideo.play();
    //     //         function analyzeFrame() {
    //     //             model.estimateSinglePose(recordedVideo).then((pose) => {
    //     //                 analyzePose(pose);
    //     //                 // console.log(analyzePose(pose));
    //     //                 // console.log(a, b);
    //     //                 // const analysisResult = analyzePose(pose);
    //     //                 // console.log(analysisResult.isLeftWristOnEllipse);
    //     //                 // console.log('Left wrist on ellipse:', analysisResult.isLeftWristOnEllipse);
    //     //                 // console.log('Right wrist on ellipse:', analysisResult.isRightWristOnEllipse);
    
    //     //                 if (!recordedVideo.paused && !recordedVideo.ended) {
    //     //                     requestAnimationFrame(analyzeFrame); // Continue analyzing next frame
    //     //                 }
    //     //             });
    //     //         }
    //     //         analyzeFrame(); // Start analyzing frames
    //     //     });
    //     // };

    //     a = 1;
    //     b = 1;
    // }

    // New function to analyze the pose
    function analyzePose(recordedPose) {
        console.log(recordedPose);
        const leftShoulder = recordedPose.keypoints[5].position;
        const rightShoulder = recordedPose.keypoints[6].position;
        const leftWrist = recordedPose.keypoints[9].position;
        const rightWrist = recordedPose.keypoints[10].position;

        const shoulderMiddlePointX = (leftShoulder.x + rightShoulder.x) / 2;
        const shoulderMiddlePointY = (leftShoulder.y + rightShoulder.y) / 2;
        const wristMiddlePointX = (leftWrist.x + rightWrist.x) / 2;
        const wristMiddlePointY = (leftWrist.y + rightWrist.y) / 2;

        // const a = 1; // Semi-major axis (you can adjust this)
        // const b = 1; // Semi-minor axis (you can adjust this)

        const ellipseFactor = checkPointOnEllipse(wristMiddlePointX, wristMiddlePointY, shoulderMiddlePointX, shoulderMiddlePointY, a, b)
        // const isLeftWristOnEllipse = checkPointOnEllipse(leftWrist.x, leftWrist.y, shoulderMiddlePointX, shoulderMiddlePointY, a, b);
        // const isRightWristOnEllipse = checkPointOnEllipse(rightWrist.x, rightWrist.y, shoulderMiddlePointX, shoulderMiddlePointY, a, b);
        
        return ellipseFactor;
    }

    // New function to check if a point is on the ellipse line
    function checkPointOnEllipse(x, y, h, k, a, b) {
        const value = ((x - h) ** 2 / (a ** 2)) + ((y - k) ** 2 / (b ** 2));
        // console.log(x,y,h,k,a,b);
        // console.log(value);
        return value;
        // return Math.abs(value - 1) < 0.01; // You can adjust the tolerance value as needed
    }

    // tensorflow에서 제공하는 js 파트
    const boundingBoxColor = "white";
    const lineWidth = 6;
    function toTuple({y, x}) {
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
        const adjacentKeyPoints = window.posenet.getAdjacentKeyPoints(keypoints, minConfidence);
        adjacentKeyPoints.forEach((keypoints) => {
            drawSegment(toTuple(keypoints[0].position), toTuple(keypoints[1].position), color, scale, ctx);
        });
    }
    
    function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
        for (let i = 0; i < keypoints.length; i++) {
            const keypoint = keypoints[i];
            if (keypoint.score < minConfidence) {
                continue;
            }
            const {y, x} = keypoint.position;
            drawPoint(ctx, y * scale, x * scale, 7, color);
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
