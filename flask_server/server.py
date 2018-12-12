from flask import Flask, request, jsonify, Response
from werkzeug.utils import secure_filename
from werkzeug.wrappers import Request, Response
import os
from flask_cors import CORS
from flask_api import status
from pyvirtualdisplay import Display
import json

import script_final
import directory_scraper_script


UPLOAD_FOLDER = './imgs/'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Standard Error Messages
app.config['OCR_ERROR_MESSAGE'] = "It looks like the OCR could not process the image! Please try taking the photo in better lighting"
app.config['DIRECTORY_SCRAPER_ERROR_MESSAGE'] = 'It looks we could not find a valid student address with the associated name!'


# Purpose: Checks if the file is allowed in the allowed extensions
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Purpose: Checks if the value returned from the directory scraper is valid
def checkValidOCR(first_name, last_name):
    if first_name == 'Email Not Found' and last_name == 'Student Address Not Found':
        return False
    else:
        return True
# Purpose: Checks if the status of the error message is valid or not
def checkValidStudentAddress(status):
    if status == 301:
        return False
    else:
        return True

# Main Route
@app.route('/')
def index():
    return '<h1>Welcome to iLIP\'s Flask Server!</h1>'

# Testing Route
@app.route('/student-info/<string:first_name>/<string:last_name>', methods=['GET'])
def get_student_info(first_name, last_name):

    result = directory_scraper_script.scrape_directory(first_name, last_name)
    if (result != None):

        print(f'${result[0]} {result[1]}')
        data = {
            'email'  : result[0],
            'address' : result[1]
        }
        results = json.dumps(data)

        resp = Response(results, status=200, mimetype='application/json')
        return resp
    else:
         resp = Response(status=400, mimetype='application/json')
         return resp

# Main Route for uploading the images and calls our ocr and directory scraper
@app.route('/upload-image/', methods=['POST'])
def upload_file():
    try:
        file = request.files['file']
        if request.method == 'POST':
            print("The method is a post request.")
            # if user does not select file, browser submit a empty part without filename
            if file.filename == '':
                flash('No selected file')
                print("No file selected!")
                return redirect(request.url)
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                # check if the file exists already - always will be true because we are saving it as scanned_image
                if (os.path.exists((os.path.join(app.config['UPLOAD_FOLDER'], filename)))):
                    print("We have a clone")
                    # Save the new file
                    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                    path_string = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    first_name, last_name = script_final.processImage(path_string)
                    # Check if the its a valid value if not we send an OCR error message
                    if (checkValidOCR(first_name, last_name)):
                        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], filename)) # REMOVE THE FILE AFTER ITS SAVED
                        user_email, student_address, success, status = directory_scraper_script.scrape_directory(first_name, last_name)

                        # Checks valid directory value if not we send a directory scraper error message
                        if (checkValidStudentAddress(status)):
                            data = {
                                "success" : success,
                                "user_email" : user_email,
                                "student_address" : student_address
                            }
                            return Response(json.dumps(data), status=200, mimetype='application/json')
                        else:
                            data = {
                                "success" : false,
                                "error_msg" : app.config['DIRECTORY_SCRAPER_ERROR_MESSAGE'],
                            }
                            return Response(json.dumps(data), status=200, mimetype='application/json')
                    else:
                        data = {
                            "success" : false,
                            "error_msg" : app.config['OCR_ERROR_MESSAGE'],
                        }
                        return Response(json.dumps(data), status=200, mimetype='application/json')
                else:
                    # Should never hit this case
                    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                    path_string = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    first_name, last_name = script_final.processImage(path_string)
                    # Check if the its a valid value if not we send an OCR error message
                    if (checkValidOCR(first_name, last_name)):
                        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], filename)) # REMOVE THE FILE AFTER ITS SAVED
                        user_email, student_address, success, status = directory_scraper_script.scrape_directory(first_name, last_name)

                        # Checks valid directory value if not we send a directory scraper error message
                        if (checkValidStudentAddress(status)):
                            data = {
                                "success" : success,
                                "user_email" : user_email,
                                "student_address" : student_address
                            }
                            return Response(json.dumps(data), status=200, mimetype='application/json')
                        else:
                            data = {
                                "success" : false,
                                "error_msg" : app.config['DIRECTORY_SCRAPER_ERROR_MESSAGE'],
                            }
                            return Response(json.dumps(data), status=200, mimetype='application/json')
                    else:
                        data = {
                            "success" : false,
                            "error_msg" : app.config['OCR_ERROR_MESSAGE'],
                        }
                        return Response(json.dumps(data), status=200, mimetype='application/json')


    except Exception as e:
        data = {
            "success" : False
        }
        return Response(json.dumps(data), status=301, mimetype='application/json')

if __name__ == "__main__":
    app.debug = False
    app.run(host = '0.0.0.0',port=5000)

CORS(app, expose_headers='Authorization')
# Run these commands
# export FLASK_APP=server.py
# flask run
# OR TO MAKE IT PUBLICLY AVAILABLE
# flask run --host=0.0.0.0
