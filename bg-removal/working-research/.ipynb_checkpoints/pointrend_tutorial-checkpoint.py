'''

PointRend in Detectron2 Tutorial
- Kim Kyeong Tae

https://colab.research.google.com/drive/1isGPL5h5_cKoPPhVL9XhMokRtHDvmMVL
'''


import torch, torchvision
import detectron2

from detectron2.utils.logger import setup_logger
setup_logger()

# import some common libraries
import numpy as np
import cv2
import torch

# import some common detectron2 utilities
