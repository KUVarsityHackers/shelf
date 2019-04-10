#https://www.googleapis.com/books/v1/volumes?q=isbn:9781119259756
#https://www.geeksforgeeks.org/get-post-requests-using-python/


import requests
import json

#get isbn from front end
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