from PIL import Image
from PIL import ImageEnhance as IE
import skimage.io as skio
from pytesseract import image_to_string
import skimage.color as skc
import skimage.filters as skf
import re
import string


# In[2]:


# The thresholdImage function takes in the name of any image in a given directory, and it returns two variables –
# an edited form of the whole pytesseract OCR text output, and the ID number located on the input ID. The function
# reads in the image and turns it into grayscale. It then runs a for-loop of 18 different thresholds (starting at a
# 0.9 threshold and every threshold 0.05 under it [skipping the 0.95 threshold because it often gives too pixelated
# and incorrect results]) and also applies a median filter on the resulting thresholded image in each iteration of
# the for-loop. Then, we run the validID() function to check if we have an idea if the picture is a valid ID. If it
# returns true, we find the ID number specifically in the string, then return a dictionary of that ID number and the
# ocr string.

def thresholdImage(im):
    im2 = skio.imread(im)
    imGS = skc.rgb2gray(im2)
    ocr1 = ''
    idn1 = []

    for x in range(18,0,-1):
        threshold = x / 20
        imT1 = imGS > threshold
        imT2 = skf.median(imT1)
        ocr1 = image_to_string(imT2)
        ocr1 = cleanString(ocr1)
        if validID(ocr1):
            idn1 = re.findall(r"\D(\d{8})\D", ocr1)
            break

    return ocr1, idn1

# The cleanString() function is pretty self-explanatory. It removes double line-breaks so that there's not unnecessary
# amount of space in-between strings. It removes any potential issues with the OCR by removing the words 'student',
# 'Middlebury', and 'College', and also removes all punctuations and unnecessary spaces.

def cleanString(string1):
    string2 = string1.replace('\n\n', '\n')
    string2 = string2.replace("'", ' ')
    string2 = string2.replace(' ', '')
    string2 = string2.replace('STUDENT\n', '')
    string2 = string2.replace('Middlebury\n', '')
    string2 = string2.replace('College', '')
    string2 = "".join(l for l in string2 if l not in string.punctuation)
    return string2


# The editString() function is a bit different; it's less cosmetic and moves the program forward. The function takes
# in the returned ocr output and edits it using the index of the ID number to cut out everything past the ID number
# to cut out anything that isn't possibly the name on the ID. If there was no ID number found in the dictionary that
# was passed in, then we just have a separate case where we pass empty variables and catch it at the end. In the end,
# we return the new, shortened ocr output and the number index of the last character in the ocr string.

def editString(ocr1, idn):
    if idn != []:
        key = ocr1.find(idn[0])
        ocr2 = ocr1[:key]
        ocr3 = ocr2.split('\n')
        ocr3 = '\n'.join(ocr3)
        key -= 1
        return ocr3, key
    else:
        blank1 = ''
        blank2 = ''
        return blank1, blank2



# The parseString() function takes the latest ocr string, counts the amount of line-breaks after the ID's location
# backwards, and if the for-loop encounters two line-breaks above with text between it, it pulls the string between
# those two line-breaks and returns it in a simple string format.

def parseString(ocr3, key):
    if ocr3 == '' and key == '':
        result2 = "No text was found in this input. Please take another picture."
        return result2
    else:
        counter = 0
        result = ''
        for y in range(key, -1, -1):
            if ocr3[y] == '\n' and counter == 2:
                result = ocr3[y+1:key]
                break
            elif counter == 2 and y == 0 and ocr3[y].isupper():
                result = ocr3[y:key]
                break
            elif ocr3[y] == '\n':
                counter += 1
            elif ocr3[y] != '\n':
                pass

        result = result.split('\n')
        # print('test: ', result)
        # result = " ".join(result)
        result2 = [i for i in result if not i.isdigit()]
        #print(result2)
        # result2 = "".join(l for l in result2 if l not in string.punctuation)
        #result2 = ''.join(q for q in result2 if q not in '‘')
        return result2


# In[3]:


# The validID function checks for a 8-digit number in the original OCR output and the same criteria as the parseString
# function, but instead it just returns a True or False to know whether to proceed or not.

def validID(string1):
    var1 = re.findall(r"\D(\d{8})\D", string1)
    if var1 == []:
        return False
    if var1 != []:
        var2 = var1[0]
        if var2[0] != '0' or var2[1] != '0':
            return False

    index1 = string1.find(var1[0])
    string2 = string1[:index1]
    string3 = string2.split('\n')
    string3 = '\n'.join(string3)
    string3 = string3.replace('\n\n', '\n')

    counter1 = 0
    result1 = ''

    for y in range(len(string3)-1, -1, -1):
        #Case 1: assume line break/ other content is above student name.
        if string3[y] == '\n' and counter1 == 2:
            return True
        #Case 2: assume there is nothing after the name.
        elif counter1 == 2 and y == 0 and string3[y].isupper():
            return True
        elif string3[y] == '\n':
            counter1 += 1
        elif string3[y] != '\n':
            pass
        elif counter1 < 2 and y == 0:
            return False

# This is pretty much the main function, where we've been running. Enter any different name in the section below,
# and it should be able to run.
def processImage(image_path):
    try:
        print(image_path, type(image_path))
        raw, dog = thresholdImage(image_path)
        shid, fard = editString(raw, dog)
        final = parseString(shid, fard)
        return final[0], final[1]
    except Exception as e:
        print('Could not process the image!')
        return "Email Not Found", "Student Address Not Found"
