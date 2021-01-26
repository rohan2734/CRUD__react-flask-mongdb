# from collections import namedtuple
from flask import Flask,make_response,jsonify,request
from flask_mongoengine import MongoEngine
# from api_constants import mongodb_user,mongodb_password
# from api_constants import *
# import api_constants

app=Flask(__name__)

database_name = "flaskAndMongo"
mongodb_user='flaskMongo'
mongodb_password='IcJo8rypM6OdPHU6'

# DB_URI = f"mongodb+srv://{api_constants.mongodb_user}:{api_constants.mongodb_password}@cluster0.3kcv6.mongodb.net/{database_name}?retryWrites=true&w=majority"
DB_URI = f"mongodb+srv://{mongodb_user}:{mongodb_password}@cluster0.3kcv6.mongodb.net/{database_name}?retryWrites=true&w=majority"

app.config["MONGODB_HOST"]=DB_URI

db = MongoEngine()
db.init_app(app)

"""
 Sample request body
 {
     "book_id" : 1,
     "name":"A game of thrones",
     "author":"George R Martin"
 }
"""

class Book(db.Document):
    book_id = db.IntField() 
    name = db.StringField()
    author =db.StringField()

    def to_json(self):
        #converts this document to JSON

        return {
            "book_id":self.book_id,
            "name":self.name,
            "author":self.author
        }

"""
api methods

POST /api/db_populate -> populate the db and returns 201 stuccess code (empty response body)

GET /api/books -> returns the details of all books (with code 200 success code)

POST /api/books -> creates a new book and returns 201 success code(empty response body)

GET /api/books3 ->returns the details of book 3 (with 200 success code if document found,404 if not found)

PUT /api/books/3 -> update author and name fields of book3 (with 204 success code)

DELETE /api/books/3 -> Deletes book 3 (with 204 success code)

"""

@app.route('/api/db_populate',methods=['POST'])
def db_populate():
    book1 = Book(
        book_id=1,
        name='A game of thrones',
        author='George Martin')
    book2 = Book(
        book_id=2,
        name='Lord of Rings',
        author='JRR Tolkein')

    book1.save()
    book2.save()

    return make_response("",201)
    

@app.route('/api/books',methods=['GET','POST'])
def api_books():
    if request.method == 'GET':
        books=[]
        for book in Book.objects:
            books.append(book)
        return make_response(jsonify(books),200) 
    elif request.method == 'POST':
        """
        Sample request body
        {
            "book_id" : 1,
            "name":"A game of thrones",
            "author":"George R Martin"
        }
        """
        content = request.json #convert to json
        book = Book(book_id=content['book_id'],
        name= content['name'],
        author=content['author'])
        book.save()
        return make_response("",201)
        
    

@app.route('/api/books/<book_id>',methods=['GET','PUT','DELETE'])
def api_each_book(book_id):
    if request.method == 'GET':
        book_obj = Book.objects(book_id=book_id).first()
        if book_obj:
            return make_response(jsonify(book_obj),200)
        else:
            return make_response("",404)
    elif request.method == 'PUT':
         """
        Sample request body
        {
            "book_id" : 1,
            "name":"A game of thrones",
            "author":"George R Martin"
        }
        """
         content = request.json #converts json data to dictionary
         book_obj = Book.objects(book_id=book_id).first()
         book_obj.update(author=content['author'] , name = content['name'])
         return make_response("",204)

    elif request.method == 'DELETE':
        book_obj = Book.objects(book_id=book_id).first()
        book_obj.delete()
        return make_response("",204)

if __name__ == '__main__':
    app.run(debug=True)