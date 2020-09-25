import ast
from os import rename
import os

font_base_path = "/data/louis/font-compat-test-service/modifying/data/font/"
font_renaming_info_file = "/data/louis/font-compat-test-service/modifying/data/font/font_rename_info.txt"

with open(font_renaming_info_file,'r') as inf:
    font_renaming_info_dic = ast.literal_eval(inf.read())
print(font_renaming_info_dic)

lang = "KOR"
lang_font_base_path = font_base_path + lang + "/"
for key in font_renaming_info_dic:
    print(type(key))
    rename(lang_font_base_path + key, lang_font_base_path + font_renaming_info_dic[key])

os.remove(font_renaming_info_file)
