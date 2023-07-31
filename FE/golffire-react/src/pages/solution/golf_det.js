

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const result_label = document.getElementById("result_label");
let pose_status = 2;
let keep_time = [0, 0, 0];
let result_message = "";

// Define global variables for the MediaRecorder and the data chunks
let mediaRecorder;
let recordedChunks = [];

// 웹캠 연결
navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(function (stream) {
    video.srcObject = stream;

    // Initialize the MediaRecorder
    mediaRecorder = new MediaRecorder(stream);

    // Define the event handlers
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.onstop = handleStop;

});


posenet.load().then((model) => {
    // 이곳의 model과 아래 predict의 model은 같아야 한다.
    video.onloadeddata = (e) => {
        //비디오가 load된 뒤 predict 진행.
        predict();
    };

    function predict() {
        //frame이 들어올 때마다 estimate를 하므로 함수화
        model.estimateSinglePose(video).then((pose) => {
            canvas.width = video.width; //캔버스와 비디오의 크기를 일치시킴
            canvas.height = video.height;

            // 영상이 거울모드로 보이게 설정
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.save();
            context.scale(-1, 1);
            context.translate(-canvas.width, 0); 
            context.drawImage(video, 0, 0, video.width, video.height);

            // 키포인트와 스켈레톤 그리기
            drawKeypoints(pose.keypoints, 0.6, context);
            drawSkeleton(pose.keypoints, 0.6, context);

            context.restore();

            // 스탠스자세검사 함수 호출
            check_GolfStance(pose);  
        });
        requestAnimationFrame(predict); //frame이 들어올 때마다 재귀호출
    }
});

/* Timer */
let count_time = setInterval(function () {
    if (keep_time[pose_status] == 0) {
        //다른 모션에서 바뀌어 들어옴
        keep_time[0] = keep_time[1] = keep_time[2] = 0;
        keep_time[pose_status]++;
    } else {
        if (pose_status == 0)
            window.parent.postMessage({message: `O를 ${keep_time[pose_status]}초 유지하셨습니다.`}, "*");
        else if (pose_status == 1)
            window.parent.postMessage({message: `X를 ${keep_time[pose_status]}초 유지하셨습니다.`}, "*");
        else if (pose_status == 2)

        if (pose_status != 2 && keep_time[pose_status] == 5) {
            if (pose_status == 0) {
                result_message = "O";
            } else {
                result_message = "X";
            }
            clearInterval(count_time);
            window.parent.postMessage({message: result_message}, "*");
        }
        keep_time[pose_status]++; //시간은 항상 세고 있다.
    }
}, 1000);


function handleDataAvailable(e) {
    if (e.data.size > 0) {
        recordedChunks.push(e.data);
    }
}

function handleStop(e) {
    const blob = new Blob(recordedChunks, {
        type: 'video/webm; codecs=vp9'
    });
    recordedChunks = [];

    const videoURL = URL.createObjectURL(blob);
    const recordedVideo = document.getElementById('recordedVideo');
    recordedVideo.src = videoURL;
    recordedVideo.play();
}


function check_GolfStance(pose) {

    // point 추출
    nose = pose.keypoints[0].position;
    leftEye = pose.keypoints[1].position;
    rightEye = pose.keypoints[2].position;
    leftEar = pose.keypoints[3].position;
    rightEar = pose.keypoints[4].position;
    leftShoulder = pose.keypoints[5].position;
    rightShoulder = pose.keypoints[6].position;
    leftElbow = pose.keypoints[7].position;
    rightElbow = pose.keypoints[8].position;
    leftWrist = pose.keypoints[9].position;
    rightWrist = pose.keypoints[10].position;
    leftHip = pose.keypoints[11].position;
    rightHip = pose.keypoints[12].position;
    leftKnee = pose.keypoints[13].position;
    rightKnee = pose.keypoints[14].position;
    leftAnkle = pose.keypoints[15].position;
    rightAnkle = pose.keypoints[16].position;

    // 왼쪽 팔꿈치가 왼쪽 어깨 안에 존재
    let elbowsInsideShoulders = (leftElbow.x < leftShoulder.x + 5) && (rightElbow.x + 20 > rightShoulder.x);

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
        console.log("골프 스탠스 자세 완료");
        color = "#4dff94";

        // Start recording if the MediaRecorder is not currently recording
        if (mediaRecorder && mediaRecorder.state !== "recording") {
            mediaRecorder.start();
            setTimeout(() => {
                // Stop recording after 5 seconds
                if (mediaRecorder.state === "recording") {
                    mediaRecorder.stop();
                }
            }, 5000);
        }

        return true;
    } else {
        console.log("스탠스 자세를 취해주세요");
        color = "white";
        return false;
    }
}


// tensorflow에서 제공하는 js 파트
const boundingBoxColor = "white";
const lineWidth = 8;
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
    const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, minConfidence);
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
        drawPoint(ctx, y * scale, x * scale, 3, color);
    }
}

function drawBoundingBox(keypoints, ctx) {
    const boundingBox = posenet.getBoundingBox(keypoints);
    ctx.rect(
        boundingBox.minX,
        boundingBox.minY,
        boundingBox.maxX - boundingBox.minX,
        boundingBox.maxY - boundingBox.minY
    );
    ctx.strokeStyle = boundingBoxColor;
    ctx.stroke();
}