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

### path ###
image_base_path = '/data/louis/font-compat-test-service/modifying/data/image/'
font_base_path = '/data/louis/font-compat-test-service/modifying/data/font/'
result_base_path = "/data/louis/font-compat-test-service/modifying/web/result/"

def imwrite(filename, img, params=None): 
	try: 
		ext = os.path.splitext(filename)[1] 
		result, n = cv2.imencode(ext, img, params) 

		if result: 
			with open(filename, mode='w+b') as f: 
				n.tofile(f) 
			return True 
		else: 
			return False 
            
	except Exception as e: 
		# print(e) 
		return False

def word_wrap(image, ctx, text, roi_width, roi_height, file_disting_num):
    """Break long text to multiple lines, and reduce point size
    until all text fits within a bounding box."""
    mutable_message = text
    iteration_attempts = 100

    def eval_metrics(txt):
        """Quick helper function to calculate width/height of text."""

        try:
            metrics = ctx.get_font_metrics(image, txt, False)
        except Exception as e:
            # print(e)
            originalfont = ctx.font
            rename(originalfont, originalfont[:(originalfont.rfind("/")+1)] + "foo" + str(file_disting_num) + originalfont[-4:])
            ctx.font = originalfont[:(originalfont.rfind("/")+1)] + "foo" + str(file_disting_num) + originalfont[-4:]
            metrics = ctx.get_font_metrics(image, txt, False)
            # print("폰트 이름 변경 : {}".format(ctx.font))
            
            
        return (metrics.text_width, metrics.text_height)

    def shrink_text():
        """Reduce point-size & restore original text"""
        ctx.font_size = ctx.font_size - 0.75
        mutable_message = text
        
    
    while ctx.font_size > 0 and iteration_attempts:
        iteration_attempts -= 1
        width, height = eval_metrics(mutable_message)
        if height > roi_height:
            shrink_text()
        elif width > roi_width:
            columns = len(mutable_message)
            while columns > 0:
                columns -= 1
                mutable_message = '\n'.join(wrap(mutable_message, columns))
                wrapped_width, _ = eval_metrics(mutable_message)
                if wrapped_width <= roi_width:
                    break
            if columns < 1:
                shrink_text()
        else:
            break
    if iteration_attempts < 1:
        raise RuntimeError("Unable to calculate word_wrap for " + text)

    
    return mutable_message


def gen_font_image_letter(font, letter, file_disting_num, letter_size = 32,
                          img_path = image_base_path + 'letter_display_for_ver3.png'):

    ROI_WIDTH = 80
    ROI_HEIGHT = 85
    
    with wand_image(filename=img_path) as img:
        with Drawing() as ctx:
            # draw_roi(ctx, ROI_SIDE, ROI_SIDE)
            # Set the font style
            ctx.fill_color = Color('BLACK')
            ctx.font = font
            ctx.font_size = letter_size
            mutable_message = word_wrap(img,
                                        ctx,
                                        letter,
                                        ROI_WIDTH,
                                        ROI_HEIGHT, file_disting_num)
            # print("후")
            # print(ctx)
            # print(ctx.get_exception())
            a = ctx.text(20, 50, mutable_message)
            # print(ctx.get_exception())
            # print(ctx)
            font_img = img
            ctx.draw(font_img)
            # print(ctx.get_exception())

            # font_img_numpy = np.array(font_img)
            # print(font_img_numpy.T.shape)
            # cv2.imwrite("font_img.png", font_img_numpy.T)
            # # print(img_numpy.shape)
            # font_img_numpy_grayscale = cv2.cvtColor(font_img_numpy, cv2.COLOR_RGBA2GRAY)
            # font_img_numpy_grayscale_t = font_img_numpy_grayscale.T
            # print(font_img_numpy_grayscale.shape)
            # cv2.imwrite("font_img_grayscale.png", font_img_numpy_grayscale)


            font_img.format = 'bmp'
            font_img.alpha_channel = False
            img_buffer = numpy.asarray(bytearray(font_img.make_blob()), dtype='uint8')
            bytesio = BytesIO(img_buffer)
            img_numpy = skimage.io.imread(bytesio)

            try:
                # rename("foo" + font[-4:], font[(font.rfind("\\")+1):])
                rename(font[:(font.rfind("/")+1)] + "foo" + str(file_disting_num) + font[-4:], font)
                # print("폰트 다시 변경 : {}".format(font))
            except FileNotFoundError:
                pass
            
            # font_img.save(filename="C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\frontend\\font-compat-test-service\\result\\" + font[(font.rfind("\\")+1):-4]+".png")
            # return font_img_numpy_grayscale
            # return font_img
            return img_numpy


'''
###
gen_font_image

param
- img_path : a path of template image.
- message : a word or sentence.

return
- font compatibility for letters
- if font support 

: generate 

'''

def gen_font_image(font, message, file_disting_num, letter_size = 32, img_path
                   = image_base_path + 'letter_display_for_ver3.png'):
    font_copy = font
    letter_img_list = []    

    # letter_img_list = Parallel(n_jobs=2)(delayed(gen_font_image_letter)(font, message[i], file_disting_num, i) for i in range(len(message)))
    # print(str(len(letter_img_list)) + "\n")
    
    for i in range(len(message)):
        letter_img_list.append(gen_font_image_letter(font, message[i], file_disting_num))
        # print(letter_img_list[i].shape)

    if len(letter_img_list) >10 :
        
        # vertical combination
        vertial_image_list = []

        vertical_count = 0
        font_img_width = 83
        for j in range(11):
            font_img_vertical = letter_img_list[j]
            
            for i in range(j+10, len(letter_img_list), 10):
                font_img_vertical = np.vstack((font_img_vertical, letter_img_list[i]))
            
            vertical_count += 1
            if vertical_count <= 1:
                font_img = font_img_vertical
                font_img = PIL_image.fromarray(np.uint8(cm.gist_earth(font_img)*255))
            else:
                font_img_vertical = PIL_image.fromarray(np.uint8(cm.gist_earth(font_img_vertical)*255))
                font_img.paste(font_img_vertical, (0, font_img_width))
                font_img_width += 83
                # font_img = np.hstack((font_img, font_img_vertical))
        
        font_img.show()

    else:
        font_img = letter_img_list[0]
        # print(type(font_img))

        letter_count = 1
        for i in range(1, len(letter_img_list)):      
            
            font_img = np.hstack((font_img, letter_img_list[i]))
            letter_count += 1
    
    # print("font_img.shape : {}".format(font_img.shape))
    
    # cv2.imshow('img', font_img)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    
    # print("font : {}".format("C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\frontend\\font-compat-test-service\\result\\" + font[(font.rfind("\\")+1):-4]+".png"))
    imwrite(result_base_path + font_copy[(font_copy.rfind("/")+1):-4]+".png", font_img)
    # imwrite("C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\frontend\\font-compat-test-service\\result\\" + str(file_disting_num) +"한글" + ".png", font_img)

    

def main():
    # C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\data\\image\\letter_display.png
    # img_path = 'C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\data\\image\\letter_display.png'
    # letter_size = 32

    input_message = sys.argv[1]
    input_lang = sys.argv[2]
    #input_message = "가나다라"
    # input_message = "가나다라마바사아자차카"

    font_file_path = font_base_path
    font_file_list = glob.glob(font_file_path + input_lang + '/*')
    unclassified_font_file_list = glob.glob(font_file_path + 'unclassified/*')
    # print(eng_font_file_list)
    # i = 0
    procs = []
    proc_count = 0 
    
    # start_time = time.time()
    for font_file_list_temp in (font_file_list, unclassified_font_file_list):
        Parallel(n_jobs=11)(delayed(gen_font_image)(font,input_message, index) for index, font in enumerate(font_file_list_temp))
        # print(font)
        # proc = Process(target=gen_font_image, args=(font, input_message, index))
        # procs.append(proc)
        # proc.start()
        # proc_count += 1

        # if proc_count == MAX_PROCESS:
        #     for proc in procs:
        #         proc.join()
        #         proc.close()
        #     procs.clear()
        #     proc_count = 0
        # gen_font_image(font, input_message)
        # i += 1
        # if i == 30:
        #     break
        
    # for proc in procs:
    #     proc.join()
    #     proc.close()
    # print("--- %s seconds ---" % (time.time() - start_time))
if __name__ == "__main__":
    main()
