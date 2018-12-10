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

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return '<h1>Welcome to iLIP\'s Flask Server!</h1>'

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

@app.route('/upload-image/', methods=['POST'])
def upload_file():
    try:
        print("No file selected!")
        file = request.files['file']
        print("File: ", file)
        print("File: ", file.filename)
        if request.method == 'POST':
            print("The method is a post request.")
            # if user does not select file, browser also
            # submit a empty part without filename
            if file.filename == '':
                flash('No selected file')
                print("No file selected!")
                return redirect(request.url)
            if file and allowed_file(file.filename):
                print("We have a file!")
                filename = secure_filename(file.filename)
                try:
                    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                    path_string = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    first_name, last_name = script_final.processImage(result_string)
                    result = directory_scraper_script.scrape_directory(first_name, last_name)
                    data = {
                        "success" : True,
                        "user_email" : result[0],
                        "student_address" : result[1]
                    }
                    return Response(json.dumps(data), status=200, mimetype='application/json')
                except Exception as e:
                    data = {
                        "success" : False,
                    }
                    return Response(json.dumps(data), status=305, mimetype='application/json')
        else:
            print("No file selected!")
            data = {
                "success" : False
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
