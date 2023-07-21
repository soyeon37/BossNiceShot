import cv2
import sys
import os
from scipy.spatial import distance as dist
import numpy as np
import pandas as pd

def video():

    ## 현재 경로
    workingdirectory = os.getcwd()

    ## 각 파일 path
    protoFile = os.path.join(workingdirectory, "src", "main", "resources", "python", "model", "pose_deploy_linevec_faster_4_stages.prototxt")
    weightsFile = os.path.join(workingdirectory, "src", "main", "resources", "python", "model", "pose_iter_160000.caffemodel")

    if not os.path.exists(protoFile):
        print(f"ERROR: File not found - {protoFile}")
        sys.exit(1)

    if not os.path.exists(weightsFile):
        print(f"ERROR: File not found - {weightsFile}")
        sys.exit(1)

    # 위의 path에 있는 network 불러오기
    net = cv2.dnn.readNetFromCaffe(protoFile, weightsFile)

    webcam = cv2.VideoCapture(0)  # Open the webcam for video capture
    ok, frame = webcam.read()
    (frameHeight, frameWidth) = frame.shape[:2]
    h = 400
    w = int((h/frameHeight) * frameWidth)
    inHeight = 200
    inWidth = 200

    # 녹화 파일 저장
    out_path = os.path.join(workingdirectory, "src", "main", "resources", "python", "output", "output.mp4")
    fps = 4  # 녹화 파일 fps 지정
    fourcc = cv2.VideoWriter_fourcc(*'MP4V')
    writer = cv2.VideoWriter(out_path, fourcc, fps, (w, h))

    pairs = [[0, 1], [1, 2], [1, 5], [2, 3], [3, 4], [5, 6], [6, 7], [1, 14], [14, 11], [14, 8], [8, 9], [9, 10], [11, 12], [12, 13]]
    thresh = 0.1
    circle_color = (0, 255, 255)
    line_color = (0, 255, 0)

    while True:
        ok, frame = webcam.read()  # Read a frame from the webcam
        if not ok:
            break

        frame = cv2.resize(frame, (w, h), cv2.INTER_AREA)
        frame_copy = np.copy(frame)

        inpBlob = cv2.dnn.blobFromImage(frame_copy, 1.0 / 255, (inWidth, inHeight), (0, 0, 0), swapRB=False, crop=False)
        net.setInput(inpBlob)
        output = net.forward()
        H = output.shape[2]
        W = output.shape[3]

        points = []

        for i in range(15):
            probMap = output[0, i, :, :]
            minVal, prob, minLoc, point = cv2.minMaxLoc(probMap)
            x = (w * point[0]) / W
            y = (h * point[1]) / H

            if prob > thresh:
                points.append((int(x), int(y)))
            else:
                points.append((0, 0))

        for i in range(len(points)):
            cv2.circle(frame_copy, (points[i][0], points[i][1]), 2, circle_color, -1)


        # 머리 위치 동그라미 표시
        center_x = int(w / 2)
        center_y = 100
        circle_radius = 30

        # 가장 위의 point 좌표
        head_x = points[0][0]
        head_y = points[0][1]

        # 가장 위의 point 좌표가 동그라미 안에 있는지 확인
        if head_x >= center_x - circle_radius and head_x <= center_x + circle_radius and \
           head_y >= center_y - circle_radius and head_y <= center_y + circle_radius:
            circle_color = (0, 255, 0)  # 녹색
        else:
            circle_color = (0, 255, 255)  # 노란색

        # 동그라미 표시
        cv2.circle(frame_copy, (center_x, center_y), circle_radius, circle_color, 2)


        for pair in pairs:
            partA = pair[0]
            partB = pair[1]
            cv2.line(frame_copy, points[partA], points[partB], line_color, 1, lineType=cv2.LINE_AA)

        writer.write(cv2.resize(frame_copy, (w, h)))

        cv2.imshow('frame', frame_copy)

        key = cv2.waitKey(1) & 0xFF
        if key == ord("q"):
            break

    writer.release()
    webcam.release()
    cv2.destroyAllWindows()

video()


