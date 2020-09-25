from textwrap import wrap
from wand.color import Color
from wand.drawing import Drawing
from wand.image import Image
import numpy as np
import cv2
import glob

from os import rename

# def isEnglishOrKorean(input_s):
#     k_count = 0
#     e_count = 0
#     for c in input_s:
#         if ord('가') <= ord(c) <= ord('힣'):
#             k_count+=1
#         elif ord('a') <= ord(c.lower()) <= ord('z'):
#             e_count+=1
#     return "k" if k_count>1 else "e"

# with Drawing() as draw:
#     draw.font = 'C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\data\\font_v5_20200306\\font\\ENG\\Aileron-Black.ttf'
#     draw.font_size = 40
#     image = Image(filename="C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\data\\image\\letter_display.png")
#     print(image.width)
#     print(image.height)
#     draw.text(int(image.width / 2), int(image.height / 2), 'Hello, world!')
    
#     draw(image)
#     image.save(filename='test.png')

# def draw_roi(contxt, roi_width, roi_height):
#     """Let's draw a blue box so we can identify what
#     our region of intrest is."""
#     ctx.push()
#     ctx.stroke_color = Color('BLUE')
#     ctx.fill_color = Color('TRANSPARENT')
#     ctx.rectangle(left = 20, top = 20, width=roi_width, height=roi_height)
#     ctx.pop()

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
            print(e)
            originalfont = ctx.font
            rename(originalfont, originalfont[:(originalfont.rfind("\\")+1)] + "foo" + originalfont[-4:])
            ctx.font = originalfont[:(originalfont.rfind("\\")+1)] + "foo" + originalfont[-4:]
            metrics = ctx.get_font_metrics(image, txt, True)
            
            
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

    ROI_WIDTH = 900
    ROI_HEIGHT = 460
    
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
            # print(img_numpy.shape)
            font_img_numpy_grayscale = cv2.cvtColor(font_img_numpy, cv2.COLOR_RGBA2GRAY)

            try:
                # rename("foo" + font[-4:], font[(font.rfind("\\")+1):])
                rename(font[:(font.rfind("\\")+1)] + "foo" + font[-4:], font)
            except FileNotFoundError:
                pass
            
            
            if (np.where(font_img_numpy_grayscale == 0)[0]).size == 0:
                print("[error] text not generated")
                return False

            else:
                print("[success] text generated : ")
                print(font[(font.rfind("\\")+1):-4]+".png")
                font_img.save(filename=font[(font.rfind("\\")+1):-4]+".png")
            
                return True
            
            # print((np.where(img_numpy_grayscale == 0)[0]).size == 0)
            # print(img_numpy_grayscale.shape)
            # print(np.where(img_numpy_grayscale == 0)[0])

def main():
    # C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\data\\image\\letter_display.png
    # img_path = 'C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\data\\image\\letter_display.png'
    # letter_size = 32

    input_message = """가"""

    font_file_path = "C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\data\\font_v5_20200306\\font\\"
    eng_font_file_list = glob.glob(font_file_path + 'ENG\\*')
    kor_font_file_list = glob.glob(font_file_path + 'KOR\\*')
    # print(eng_font_file_list)
    i = 0
    for font in kor_font_file_list:
        print(font)

        success = gen_font_image(font, input_message)
        i += 1
        if i == 30:
            break

if __name__ == "__main__":
    main()
