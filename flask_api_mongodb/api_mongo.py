from flask import Flask
from flask_mongoengine import MongoEngine
from api_constants import mongodb_user,mongodb_password,mongodb_dbname

app=Flask(__name__)

database_name = "flaskAndMongo"
DB_URI = f"mongodb+srv://{mongodb_user}:{mongodb_password}@cluster0.3kcv6.mongodb.net/{mongodb_dbname}?retryWrites=true&w=majority"

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

if __name__ == '__main__':
    app.run(debug=True)