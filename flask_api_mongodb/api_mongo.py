from flask import Flask
from flask_mongoengine import MongoEngine

app=Flask(__name__)

database_name = "flaskAndMongo"
DB_URI = ""
app.config["M"]

db = MongoEngine()
db.init_app(app)

if __name__ == '__main__':
    app.run(debug=True)