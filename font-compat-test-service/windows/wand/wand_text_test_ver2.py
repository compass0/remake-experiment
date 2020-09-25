from textwrap import wrap
from wand.color import Color
from wand.drawing import Drawing
from wand.image import Image
import numpy as np
import cv2
import glob
import re
import sys

import os.path

# from pathlib import Path
from os import rename



def word_wrap(image, ctx, text, roi_width, roi_height):
    """Break long text to multiple lines, and reduce point size
    until all text fits within a bounding box."""
    mutable_message = text
    iteration_attempts = 100

    def eval_metrics(txt):
        """Quick helper function to calculate width/height of text."""

        try:
            metrics = ctx.get_font_metrics(image, txt, True)
        except Exception as e:
            # print(e)
            originalfont = ctx.font
            rename(originalfont, originalfont[:(originalfont.rfind("\\")+1)] + "foo" + originalfont[-4:])
            ctx.font = originalfont[:(originalfont.rfind("\\")+1)] + "foo" + originalfont[-4:]
            metrics = ctx.get_font_metrics(image, txt, True)
        
        # metrics = ctx.get_font_metrics(image, txt, True)
            
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



def test_font_compat(font, letter, img_path = 'C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\data\\image\\letter_display_for_test.png'):
    with Image(filename=img_path) as img:
        with Drawing() as ctx:
            # draw_roi(ctx, ROI_SIDE, ROI_SIDE)
            # Set the font style
            ctx.fill_color = Color('BLACK')
            ctx.font = font
            ctx.font_size = 32
            
            try:
                metrics = ctx.get_font_metrics(img, letter, False)

            except Exception as e:
                # print(e)
                originalfont = ctx.font
                rename(originalfont, originalfont[:(originalfont.rfind("\\")+1)] + "bar" + originalfont[-4:])
                ctx.font = originalfont[:(originalfont.rfind("\\")+1)] + "bar" + originalfont[-4:]
            # metrics = ctx.get_font_metrics(img, letter, False)

            a = ctx.text(20, 50, letter)

            ctx.draw(img)


            font_img_numpy = np.array(img)

            font_img_numpy_grayscale = cv2.cvtColor(font_img_numpy, cv2.COLOR_RGBA2GRAY)


            try:
                # rename("foo" + font[-4:], font[(font.rfind("\\")+1):])
                rename(font[:(font.rfind("\\")+1)] + "bar" + font[-4:], font)
            except FileNotFoundError:
                pass
            
            
            if (np.where(font_img_numpy_grayscale == 0)[0]).size == 0:
                # print("[error] letter '" + letter + "' not generated")
                return False

            else:
                # print("[success] letter '" + letter + "' generated")
                # print(font[(font.rfind("\\")+1):-4]+".png")
            
                return True



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

def gen_font_image(font, message, letter_size = 32, img_path = 'C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\data\\image\\letter_display.png'):

    message_pass_index = []
    message_fail_index = []
    ROI_WIDTH = 305
    ROI_HEIGHT = 140
    
    with Image(filename=img_path) as img:
        with Drawing() as ctx:

            # draw_roi(ctx, ROI_SIDE, ROI_SIDE)
            # Set the font style
            ctx.fill_color = Color('BLACK')
            ctx.font = font
            ctx.font_size = letter_size
            mutable_message = word_wrap(img,
                                        ctx,
                                        message,
                                        ROI_WIDTH,
                                        ROI_HEIGHT)
            # print(ctx)
            # print(ctx.get_exception())
            a = ctx.text(20, 50, mutable_message)
            # print(ctx.get_exception())
            # print(ctx)
            font_img = img
            ctx.draw(font_img)
            # print(ctx.get_exception())

            font_img_numpy = np.array(font_img)
        
            # print(font_img_numpy.shape)
            font_img_numpy_grayscale = cv2.cvtColor(font_img_numpy, cv2.COLOR_RGBA2GRAY)

                        
            for i in range(len(message)):
                if test_font_compat(font, message[i]):
                    message_pass_index.append(i)
                else:
                    message_fail_index.append(i)
            

            try:
                # rename("foo" + font[-4:], font[(font.rfind("\\")+1):])
                rename(font[:(font.rfind("\\")+1)] + "foo" + font[-4:], font)
            except FileNotFoundError:
                pass
            
            
            if (np.where(font_img_numpy_grayscale == 0)[0]).size == 0:
                # print("[error] text not generated")
                # print("False")
                return False, message_pass_index, message_fail_index

            else:
                # print("[success] text generated : ")
                # print(font[(font.rfind("\\")+1):-4]+".png")
                # print("True1")
                font_img.save(filename="C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\frontend\\font-compat-test-service\\result\\" + font[(font.rfind("\\")+1):-4]+".png")
                # cv2.imwrite(font[(font.rfind("\\")+1):-4]+".png", font_img_numpy)
                # print("True2")
            
                return True, message_pass_index, message_fail_index
            
            z
            # print((np.where(img_numpy_grayscale == 0)[0]).size == 0)
            # print(img_numpy_grayscale.shape)
            # print(np.where(img_numpy_grayscale == 0)[0])

def main():
    # C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\data\\image\\letter_display.png
    # img_path = 'C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\data\\image\\letter_display.png'
    # letter_size = 32

    # input_message = sys.argv[1]
    # input_message = """뷁 붹 쉙 줿 줾 퀢 퀽 뷬 췱 칅"""
    # input_message = "€₺£₩"
    input_message = "!?@#!@#?"
    # input_message = input_message.encode('utf-8').decode('utf-8')
    # print(input_message)

    '''
    remove all whitespace characters
    
    '''
    # input_message = ''.join(input_message.split())

    font_file_path = "C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\data\\font_v5_20200306\\font\\"
    
    # print(font_file_path)
    # print(type(font_file_path))

    # eng_font_file_list = list([Path(i) for i in (glob.glob(font_file_path + 'ENG\\*'))])
    # kor_font_file_list = list([Path(i) for i in (glob.glob(font_file_path + 'KOR\\*'))])
    
    eng_font_file_list = glob.glob(font_file_path + 'ENG\\*')
    kor_font_file_list = glob.glob(font_file_path + 'KOR\\*')
    unclassified_font_file_list = glob.glob(font_file_path + 'unclassified\\*')

    # print(type(eng_font_file_list[1]))
    # print(type(kor_font_file_list[1]))
    # print(kor_font_file_list)
    
    i = 0
    success_num = 0
    for font_file_list in (kor_font_file_list, eng_font_file_list, unclassified_font_file_list):
        for font in font_file_list:
            # print(type(font))

            success, message_pass_index, message_fail_index = gen_font_image(font, input_message)

            # print("\nㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ\n")
            # print("font name : {}".format(font))
            # print("success : " + ("yes" if success else "no"))

            # print("message_pass_index\n")
            # for j in message_pass_index:
            #     print(input_message[j], end=" ")
            
            # # print("\n")

            # # print("message_fail_index\n")
            # for k in message_fail_index:
            #     print(input_message[k], end= " ")

            # print("\nㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ\n")

            # print("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ debugging ㅡㅡㅡㅡㅡㅡㅡㅡㅡ\ni: {}".format(i))
            if success == True:
                success_num += 1
            # i += 1
            # if i == 30:
            #     break
    
    print(success_num)
if __name__ == "__main__":
    main()
