from textwrap import wrap
from wand.color import Color
from wand.drawing import Drawing
# from wand.image import Image
import numpy as np
import cv2
import glob
import sys


from io import BytesIO
import skimage.io
from wand.image import Image as wand_image
import numpy
# import cv2

from PIL import Image as PIL_image
from matplotlib import cm # to convert numpy array to PIL image

from os import rename

### multi-threading
from multiprocessing import Process
MAX_PROCESS = 50

import time, os

from joblib import Parallel, delayed

### save dictionary data into binary file using pickle ###
import pickle


def get_font_renaming_info(font, index):
    with wand_image(filename=img_path) as img:
        with Drawing() as ctx:
            ctx.fill_color = Color('BLACK')
            ctx.font = font
            ctx.font_size = letter_size


            try:
                metrics = ctx.get_font_metrics(img, message[0], False)
            
            except Exception as e:
                # print(e)
                originalfont = ctx.font
                font_rename_info_dic["foo" + str(index) + originalfont[-4:]] = originalfont[(originalfont.rfind("\\")+1):]
                rename(originalfont, originalfont[:(originalfont.rfind("\\")+1)] + "foo" + str(index) + originalfont[-4:])
                # print("폰트 이름 변경 : {}".format(ctx.font))


### path ###
image_base_path = 'C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\data\\image\\'
font_base_path = "C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\data\\font_v5_20200306\\font\\"



font_file_path = font_base_path
input_lang = "KOR"
font_file_list = glob.glob(font_file_path + input_lang + '\\*')

letter_size = 32
img_path = image_base_path + 'letter_display_for_ver3.png'

message = "가"
font_rename_info_dic = {}

for index, font in enumerate(font_file_list):
    get_font_renaming_info(font, index)

f = open("C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\data\\font_v5_20200306\\font\\font_rename_info.txt", 'w')
f.write(str(font_rename_info_dic))
f.close()

