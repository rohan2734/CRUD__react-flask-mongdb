from flask import Flask
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_cors import CORS
# from flask_jwt_extended import JWTManager

from resources.routes import initialize_routes
from database.db import initialize_db
from resources.errors import errors

app = Flask(__name__)
CORS(app)
# app.config.from_envvar('ENV_FILE_LOCATION')
api = Api(app)
# api = Api(app,errors=errors)
bcrypt = Bcrypt(app)

# jwt = JWTManager(app)

DB_URI='mongodb+srv://simpleryotak:5culbjU18tTsBo5x@cluster0.7h7ra.mongodb.net/simpler?retryWrites=true&w=majority'

app.config["MONGODB_HOST"]=DB_URI

initialize_db(app)


initialize_routes(api)


if __name__ == '__main__':
    app.run(debug=True)
# app.run()