#https://www.googleapis.com/books/v1/volumes?q=isbn:9781119259756
#https://www.geeksforgeeks.org/get-post-requests-using-python/


import requests
import json

def getBookInfo(isbnInput):
    #get isbn from front end
    isbn = str(isbnInput)
    url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn
    req = requests.get(url = url)
    jsonFile = req.json()
    return jsonFile
