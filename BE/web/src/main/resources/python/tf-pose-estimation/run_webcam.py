import argparse
import logging
import time
import os

# 파이썬 log 출력 제어
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
#'0': Show all logs (default behavior)
#'1': Hide INFO logs
#'2': Hide INFO and WARNING logs
#'3': Hide INFO, WARNING, and ERROR logs

# 현재 경로 지정
workingdirectory = os.getcwd()

import cv2
import numpy as np

from tf_pose.estimator import TfPoseEstimator
from tf_pose.networks import get_graph_path, model_wh

import tensorflow.compat.v1 as tf
from tensorflow.python.client import device_lib

from PIL import ImageFont, ImageDraw, Image
# print(device_lib.list_local_devices())

# Optional if you are using a GPU
gpus = tf.config.experimental.list_physical_devices('GPU')
for gpu in gpus:
    tf.config.experimental.set_memory_growth(gpu, True)
print(gpus)

logger = logging.getLogger('TfPoseEstimator-WebCam')
logger.setLevel(logging.CRITICAL) # DEBUG 로 변경하여 출력할수있다. CRITICAL 로 하여 spring 상에서 출력되지않게한다.
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('[%(asctime)s] [%(name)s] [%(levelname)s] %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

fps_time = 0
BodyParts = ["코", "목", "왼어깨", "왼팔꿈치", "왼속목", "오른어깨", "오른팔꿈치", "오른손목", "왼허리", "왼무릎", "왼발목", "오른허리", "오른무릎", "오른발목", "왼눈", "왼귀", "오른눈", "오른귀" ]
def str2bool(v):
    return v.lower() in ("yes", "true", "t", "1")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='tf-pose-estimation realtime webcam')
    parser.add_argument('--camera', type=int, default=0)

    parser.add_argument('--resize', type=str, default='240x160',
                        help='if provided, resize images before they are processed. default=0x0, Recommends : 432x368 or 656x368 or 1312x736 ')
    parser.add_argument('--resize-out-ratio', type=float, default=4.0,
                        help='if provided, resize heatmaps before they are post-processed. default=1.0')

    parser.add_argument('--model', type=str, default='mobilenet_thin', help='cmu / mobilenet_thin / mobilenet_v2_large / mobilenet_v2_small')
    parser.add_argument('--show-process', type=bool, default=False,
                        help='for debug purpose, if enabled, speed for inference is dropped.')

    parser.add_argument('--tensorrt', type=str, default="False",
                        help='for tensorrt process.')
    args = parser.parse_args()

    logger.debug('initialization %s : %s' % (args.model, get_graph_path(args.model)))
    w, h = model_wh(args.resize)
    if w > 0 and h > 0:
        e = TfPoseEstimator(get_graph_path(args.model), target_size=(w, h), trt_bool=str2bool(args.tensorrt))
    else:
        e = TfPoseEstimator(get_graph_path(args.model), target_size=(432, 368), trt_bool=str2bool(args.tensorrt))

    logger.debug('cam read+')
    cam = cv2.VideoCapture(args.camera)
    ret_val, image = cam.read()
    logger.info('cam image=%dx%d' % (image.shape[1], image.shape[0]))

    # Define the circle's center and radius
    circle_center = (330, 100)
    circle_radius = 30

    # Define the codec and create a VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # or use 'XVID'
    output_width, output_height = 800, 600  # Specify your desired output size
    out_path = os.path.join(workingdirectory, "src", "main", "resources", "python", "tf-pose-estimation", "output.mp4")
    out = cv2.VideoWriter(out_path, fourcc, 20.0, (output_width, output_height))

    while True:
        ret_val, image = cam.read()
        image = cv2.flip(image, 1)  # 거울 모드
        
        logger.debug('image process+')
        humans = e.inference(image, resize_to_default=(w > 0 and h > 0), upsample_size=args.resize_out_ratio)

        # Print the coordinates of all detected body parts
        head_point_x, head_point_y = 0, 0 # Default
        for human in humans:
            for i, body_part in human.body_parts.items():
                # Define position for text (slightly shifted to avoid overlapping with joint circle)
                text_pos = (int(body_part.x * image.shape[1]) + 10, int(body_part.y * image.shape[0]) + 10)

                # Define text content and parameters
                text_content = BodyParts[i] #f"Part {i}"

                # Convert OpenCV image to PIL image
                pil_image = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

                # Create ImageDraw object and draw text on the image
                draw = ImageDraw.Draw(pil_image)
                font_path = os.path.join(workingdirectory, "src", "main", "resources", "python", "tf-pose-estimation", "HancomMalangMalang-Bold.ttf")
                unicode_font = ImageFont.truetype(font_path, 15)  # Path to the font file
                draw.text(text_pos, text_content, font=unicode_font, fill=(0, 255, 119))

                # Convert PIL image back to OpenCV image
                image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)


                # text_font = cv2.FONT_HERSHEY_SIMPLEX
                # text_scale = 0.5
                # text_color = (255, 255, 255)  # white color
                # text_thickness = 1
                #
                # # Add text to the image
                # cv2.putText(image, text_content, text_pos, text_font, text_scale, text_color, text_thickness)

                if i == 0:
                    # Get the most head point's coordinates
                    head_point_x, head_point_y = body_part.x, body_part.y

        # Calculate the distance from the top point to the circle's center
        distance = ((circle_center[0]/image.shape[1] - head_point_x)**2 + (circle_center[1]/image.shape[0] - head_point_y)**2)**0.5

        # Change the circle's color to green if the top point is inside it, red otherwise
        circle_color = (0, 255, 0) if distance <= circle_radius/np.sqrt(image.shape[1] ** 2 + image.shape[0] ** 2) else (0, 0, 255)

        # Draw the circle
        cv2.circle(image, circle_center, circle_radius, circle_color, 5)

        logger.debug('postprocess+')
        image = TfPoseEstimator.draw_humans(image, humans, imgcopy=False)

        # Resize the output image
        output_width, output_height = 800, 600  # Specify your desired output size
        image = cv2.resize(image, (output_width, output_height))

        logger.debug('show+')
        cv2.putText(image,
                    "FPS: %f" % (1.0 / (time.time() - fps_time)),
                    (10, 10),  cv2.FONT_HERSHEY_SIMPLEX, 0.5,
                    (0, 255, 0), 2)
        cv2.imshow('tf-pose-estimation result', image)

        # Write the frame to the output file
        out.write(image)

        fps_time = time.time()

        key = cv2.waitKey(1) & 0xFF
        if key == ord("q"):
            break
        logger.debug('finished+')

    out.release()
    cam.release()
    cv2.destroyAllWindows()
