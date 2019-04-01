import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('serviceKey.json')
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()

import flask
from flask import Flask, render_template, request, Response

import json

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def main():

    # if request.method == 'POST':
    #     return handle_request(request.form)
    if request.method == 'GET':
        return render_template('home.html')

@app.route('/login' , methods=['POST', 'GET'])
def logon():
    #pushes logon information to firestore
    s = request.form.to_dict()['json_string']
    json_acceptable_string = s.replace("'", "\"")
    d = json.loads(json_acceptable_string)
    
    userID = d['userID']
    password = d['password']

    doc_ref = db.collection(u'users').document(userID)
    doc_ref.set({
        u'password': password
    })
    return(True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001, debug=True)
