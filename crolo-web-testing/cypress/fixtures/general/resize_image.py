import cv2

def image_resize(image, width = None, height = None, inter = cv2.INTER_AREA):
    # initialize the dimensions of the image to be resized and
    # grab the image size
    dim = None
    (h, w) = image.shape[:2]

    # if both the width and height are None, then return the
    # original image
    if width is None and height is None:
        return image

    # check to see if the width is None
    if width is None:
        # calculate the ratio of the height and construct the
        # dimensions
        r = height / float(h)
        dim = (int(w * r), height)

    # otherwise, the height is None
    else:
        # calculate the ratio of the width and construct the
        # dimensions
        r = width / float(w)
        dim = (width, int(h * r))

    # resize the image
    resized = cv2.resize(image, dim, interpolation = inter)

    # return the resized image
    return resized, dim

img_name = "650_433-removebg-preview.png"
img = cv2.imread(img_name, -1)

for input_width in range(100, 1600, 100):
    resized_img, size = image_resize(img, height = input_width)
    # resized_img, size = image_resize(img, width = input_width)
    # print(resized_img.shape)
    cv2.imwrite(str(size[0]) + "x" + str(size[1]) + img_name[-4:], resized_img)
