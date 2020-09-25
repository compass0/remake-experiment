from textwrap import wrap
from wand.color import Color
from wand.drawing import Drawing
from wand.image import Image


with Image(filename='logo:') as img:
    img.save(filename='test2.png')