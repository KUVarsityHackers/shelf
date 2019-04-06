#https://www.googleapis.com/books/v1/volumes?q=isbn:9781119259756
#https://www.geeksforgeeks.org/get-post-requests-using-python/


import requests
import json

def getBookInfo(isbnInput):
    #get isbn from front end
    isbn = str(9781101980132)
    url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn
    req = requests.get(url = url)
    jsonFile = req.json()
    return jsonFile

bookInfo = jsonFile['items'][0]['volumeInfo']
title = bookInfo['title']
author = bookInfo['authors']
publishedDate = bookInfo['publishedDate']

print(title)
print(author)
print(publishedDate)
