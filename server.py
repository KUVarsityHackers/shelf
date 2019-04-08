import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from bookInfo import getBookInfo

cred = credentials.Certificate('serviceKey.json')
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()

import flask
from flask import Flask, render_template, request, Response

import json

app = Flask(__name__)

#reference for books collection from firestore

@app.route('/', methods=['GET', 'POST'])
def main():
    return render_template('index.html')

@app.route('/home.html', methods=['GET', 'POST'])
def toHome():
    return render_template('home.html')

@app.route('/list.html', methods=['GET', 'POST'])
def toList():
    return render_template('list.html')

@app.route('/borrow.html', methods=['GET', 'POST'])
def toBorrow():
    return render_template('borrow.html')

# @app.route('/login' , methods=['POST', 'GET'])
# def logon():
#     #pushes logon information to firestore
#     s = request.form.to_dict()['json_string']
#     json_acceptable_string = s.replace("'", "\"")
#     d = json.loads(json_acceptable_string)
    
#     userID = d['userID']
#     password = d['password']

#     doc_ref = db.collection(u'users').document(userID)
#     doc_ref.set({
#         u'password': password
#     })
#     return(True)

@app.route('/listing' , methods=['POST', 'GET'])
def listing():
    #pushes logon information to firestore
    s = request.form.to_dict()['json_string']
    json_acceptable_string = s.replace("'", "\"")
    d = json.loads(json_acceptable_string)

    isbn = d['isbn']
    user = d['user']
    email = d['email']
    #address = d['address']
    #city = d['city']
    #state = d['state']

    sourApple = getBookInfo(isbn)

    doc_ref = db.collection(u'lenders').document(user)
    doc_ref.set({
        u'email': email
    })
    
    
    #there is an issue when getting the address, city, and state from  the list.html file

    book_ref = db.collection(u'books').document(isbn)
    book_ref.set({
        u'title': sourApple[0],
        u'publishedDate': sourApple[1],
        u'isbn': isbn
    })
    
    bookOwner = db.collection(u'books').document(isbn).collection("owner").document(user)
    bookOwner.set({
        u'email': email
    })

    return(True)

@app.route('/search' , methods=['POST', 'GET'])
def search():
    #pushes logon information to firestore
    s = request.form.to_dict()['json_string']
    json_acceptable_string = s.replace("'", "\"")
    d = json.loads(json_acceptable_string)
    
    isbn = d['isbn']
    
    # try:
    #     book_ref.document(isbn).get()
    # except google.cloud.exceptions.NotFound:
    #     return("Nothing was found.")
    return(True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001, debug=True)

