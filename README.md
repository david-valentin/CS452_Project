# CS452 - Scanner ID iOS Mobile App

### Abstract

Here at Middlebury College, students use their college IDs on a daily basis, from swiping in to dining halls with their meal plan credentials to entering into dormitories across campus. However, these IDs only display a small amount of a student’s information; his/her name, birthdate, and ID number.


There are several scenarios where having an application that can return student user address could be useful. In cases where lost IDs need to be returned, or in situations involving Public Safety or student safety concerns, student IDs alone do not provide pertinent full information about where the student lives or what year the student is. Moreover, the mail center faces a challenge where incoming student mail often does not have the student’s box number and the box number needs to be verified or in some cases, the incoming student mail belongs to alumni.

We as Middlebury and Image Processing students thought we could solve this issue by creating an application that students, faculty, and public safety can use to take a picture of a recovered ID and receive information from Middlebury’s school-wide directory. Not only would we be able to use techniques of filtering and thresholding from the content of our course, but we would also be able to make a multi-purpose application to be used in different situations.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites - Flask Server - Python Libraries - ./flask_server/

Our flask server runs on the latest Python 3, so please make sure you have the latest python3 on your machine and that your $PATH is set up such that it references the right version of python to run. The server is deployed at http://basin.cs.middlebury.edu:5000/ if you would like acccess to it.

Our repo has a virtual python environment called flask_env available in which you can activate with this command:

```
    source flask_env/bin/activate
```

Install the necessary dependencies in the virtual environment for the project:

```
    pip3 install requirements.txt
```

Here is a general list of our dependencies:

```
certifi==2018.10.15
chardet==3.0.4
Click==7.0
cloudpickle==0.6.1
cycler==0.10.0
dask==1.0.0
decorator==4.3.0
EasyProcess==0.2.3
Flask==1.0.2
Flask-Cors==3.0.7
idna==2.7
itsdangerous==1.1.0
Jinja2==2.10
kiwisolver==1.0.1
MarkupSafe==1.1.0
matplotlib==3.0.2
networkx==2.2
numpy==1.15.4
Pillow==5.3.0
pyparsing==2.3.0
pytesseract==0.2.5
python-dateutil==2.7.5
PyVirtualDisplay==0.2.1
PyWavelets==1.0.1
requests==2.20.1
scikit-image==0.14.1
scipy==1.1.0
selenium==3.141.0
six==1.11.0
toolz==0.9.0
urllib3==1.24.1
Werkzeug==0.14.1

```

### Prerequisites - Client - Javascript Libraries - ./react_native/

Our client is built using the [React Native](https://facebook.github.io/react-native/) Framework so make sure you have the latest [Node.js]('https://nodejs.org/en/') or just have [NPM]('https://www.npmjs.com/') which comes with nodejs!


### Installing the necessary NPM packages:

`npm install`


### Running the app on your device:

The app currently only works on iOS device as we have not configured the details for it to run on an android device.
Open up the ./react_native/react_native.xcodeproj and plug in can connect your device. Run a build and make sure you have an Apple Developers Account configured and set up with your project or else it will not run!

Build the file and you should be able to see the client. We have deployed the server remotely so your phone should be able to access it.

## Directory Structure
    .
    ├── react_native                   # Client
    ├── flask_server                   # Backend    
    ├── LICENSE
    └── README.md

## Authors

* **David Valentin** - [Github](https://github.com/david-valentin)
* **Christian Chiang** - [Github](https://github.com/david-valentin)
* **Brandon Choe** - [Github](https://github.com/david-valentin)
* **Reid Buzby** - [Github](https://github.com/david-valentin)

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.md) file for details

## Acknowledgments

* Pythesseracts Community!
