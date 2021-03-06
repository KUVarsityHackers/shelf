
# [START gae_flex_quickstart]
import logging

import firebase_admin
import google
from firebase_admin import credentials
from firebase_admin import firestore
from math import sin, cos, sqrt, atan2, radians

cred = credentials.Certificate('serviceKey.json')
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()

import flask
from flask import Flask, render_template, request, Response, jsonify

import json
import requests
import random

app = Flask(__name__)

#get isbn from front end#
def getBookInfo(isbnNum):
    isbn = str(isbnNum)
    url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn
    req = requests.get(url = url)
    jsonFile = req.json()
    bookInfo = jsonFile['items'][0]['volumeInfo']
    title = bookInfo['title']
    author = bookInfo['authors']
    publishedDate = bookInfo['publishedDate']
    banana = []
    banana.append(title)
    banana.append(publishedDate)
    banana.append(author)
    return banana

@app.route('/', methods=['GET', 'POST'])
def main():
    return render_template('home.html')


@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500


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
    latitude = d['lat']
    longitude = d['lon']

    randomID = str(random.randint(1,1000000))
    
    try:
        sourApple = getBookInfo(isbn)
        title =  (sourApple[0]).lower().replace("'","/")
        publishedDate = sourApple[1]
    except:
        return ("Could not find match for ISBN.")
    
    #set book info for document in the collection
    book_ref = db.collection(u'books').document(isbn)
    book_ref.set({
         u'title': title,
         u'publishedDate': publishedDate,
         u'isbn': isbn
    })
    #add user to owner collection of book
    bookOwner = db.collection(u'books').document(isbn).collection(u'owner').document(randomID)
    bookOwner.set({
        u'email': email,
        u'username': user,
        u'latitude': latitude,
        u'longitude': longitude
    })

    return ("You have successfully added to your shelf!")

@app.route('/api/search' , methods=['POST', 'GET'])
def search():
    #pushes logon information to firestore
    s = request.form.to_dict()['json_string']
    json_acceptable_string = s.replace("'", "\"")
    d = json.loads(json_acceptable_string)
    
    isbn = d['isbn']
    title = (d['title']).lower()
    latitude = d['latitude']
    longitude = d['longitude']
    searchRadius = (d['radius'])

    searchBy = d['searchBy']
    
    try:
        obj = []
        if(searchBy == "Title"):
            listingArr = []
            owners = []
            query = db.collection(u'books').where(u'title',u'==',title)
            isbnFromTitle = query.stream()
            
            for listing in isbnFromTitle:
                listingArr.append(listing.id)
            for ISBN in listingArr:
                owners.append(db.collection(u'books').document(ISBN).collection(u'owner').stream())
                for docs in owners:
                    for doc in docs:
                        obj.append(doc.to_dict())
        else:
            docs = db.collection(u'books').document(isbn).collection(u'owner').stream()
            for doc in docs:
                obj.append(doc.to_dict())
        
    except google.cloud.exceptions.NotFound:
        return("Nothing was found.")
    
    #only return responses within user specified search radius
    newObj = []
    for person in obj:
        #calculate distance
        latFound = person["latitude"]
        lonFound = person["longitude"]
                 #adapted from https://stackoverflow.com/questions/19412462/getting-distance-between-two-points-based-on-latitude-longitude
         #approximate radius of earth in km
        R = 6373.0
        lat1 = radians(latFound)
        lon1 = radians(lonFound)
        lat2 = radians(latitude)
        lon2 = radians(longitude)
        dlon = lon2 - lon1
        dlat = lat2 - lat1
        a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        distance = R * c
        if (distance < float(searchRadius)):
            temp = []
            temp.append(person["email"])
            temp.append(distance)
            newObj.append(temp)

    return Response(json.dumps(newObj),  mimetype='application/json')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_flex_quickstart]