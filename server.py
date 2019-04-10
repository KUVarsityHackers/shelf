import firebase_admin
import google
from firebase_admin import credentials
from firebase_admin import firestore
from bookInfo import getBookInfo

cred = credentials.Certificate('serviceKey.json')
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()

import flask
from flask import Flask, render_template, request, Response, jsonify

import json
import requests

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def main():
    return render_template('index.html')

@app.route('/docs/')
def toDocsHome():
    return app.send_static_file("docs/index.html")

@app.route('/docs/<path:filename>')
def toDocs(filename):
    return app.send_static_file("docs/" + filename)

@app.route('/home.html', methods=['GET', 'POST'])
def toHome():
    return render_template('home.html')

@app.route('/list.html', methods=['GET', 'POST'])
def toList():
    return render_template('list.html')

@app.route('/borrow.html', methods=['GET', 'POST'])
def toBorrow():
    return render_template('borrow.html')

@app.route('/listing' , methods=['POST', 'GET'])
def listing():
    s = request.form.to_dict()['json_string']
    json_acceptable_string = s.replace("'", "\"")
    d = json.loads(json_acceptable_string)

    isbn = d['isbn']
    user = d['user']
    email = d['email']
    #address = d['address']
    # city = d['city']
    # state = d['state']
    try:
        sourApple = getBookInfo(isbn)
        title =  sourApple[0]
        publishedDate = sourApple[1]
    except:
        return ("Could not find match for ISBN.")
    
    doc_ref = db.collection(u'lenders').document(user)
    doc_ref.set({
        u'email': email,
        # u'address': address,
        # u'state': state
    })
    

    #set book info for document in the collection
    book_ref = db.collection(u'books').document(isbn)
    book_ref.set({
         u'title': title,
         u'publishedDate': publishedDate,
         u'isbn': isbn
    })
    #add user to owner collection of book
    bookOwner = db.collection(u'books').document(isbn).collection(u'owner').document(user)
    bookOwner.set({
        u'email': email
    })

    return ("You have successfully added to your shelf!")

@app.route('/api/search' , methods=['POST', 'GET'])
def search():
    #pushes logon information to firestore
    s = request.form.to_dict()['json_string']
    json_acceptable_string = s.replace("'", "\"")
    d = json.loads(json_acceptable_string)
    
    isbn = d['isbn']
    # title = d['title']
    # author = d['author']
    
    #query books document by isbn and return retrieved to frontend
    try:
        obj = []
        docs = db.collection(u'books').document(isbn).collection(u'owner').get()
        for doc in docs:
            obj.append(doc.to_dict())
        
    except google.cloud.exceptions.NotFound:
        return("Nothing was found.")
    
    return Response(json.dumps(obj),  mimetype='application/json')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001, debug=True)
