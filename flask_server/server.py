from flask import Flask, request, jsonify
import directory_scraper_script
app = Flask(__name__)

@app.route('/')
def index():
    return '<h1>Welcome to iLIP\'s Flask Server!</h1>'

@app.route('/student-info/<string:first_name>/<string:last_name>', methods=['GET'])
def get_student_info(first_name, last_name):

    result = directory_scraper_script.scrape_directory(first_name, last_name)
    print(result)
    return jsonify(email=result[0], address=result[1])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)

# Run these commands
# export FLASK_APP=server.py
# flask run
# OR TO MAKE IT PUBLICLY AVAILABLE
# flask run --host=0.0.0.0
