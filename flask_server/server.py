from flask import Flask, request, jsonify, Response
import directory_scraper_script
from werkzeug.utils import secure_filename
from werkzeug.wrappers import Request, Response
import os
from flask_cors import CORS
from flask_api import status
from pyvirtualdisplay import Display



UPLOAD_FOLDER = '/imgs/'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)

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

@app.route('/upload-image/')
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            data = {
                success : True
            }
            return Response(json.dumps(data), status=200, mimetype='application/json')
            
if __name__ == "__main__":
    app.debug = False
    app.run(host = '0.0.0.0',port=5000)

CORS(app, expose_headers='Authorization')
# Run these commands
# export FLASK_APP=server.py
# flask run
# OR TO MAKE IT PUBLICLY AVAILABLE
# flask run --host=0.0.0.0
