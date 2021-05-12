
# from datetime import datetime
from flask import Blueprint,request,make_response,jsonify
from flask_restful import Resource
# from flask_jwt_extended import create_access_token
# import datetime
from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import InternalServerError,UserAlreadyExist,UnAuthorized,FieldsEmpty,PasswordIsShort,UserDoesntExist,FieldsEmpty

from database.models import User


class UsersSignup(Resource):
    def post(self):
        body = request.get_json()
    # try:
#User(name=body[])
        if len(body['firstName'])== 0  or len(body['lastName']) == 0 or len(body['emailID'])==0 or len(body['password'] )== 0 or len(body['confirmPassword']) == 0 :
            return make_response(jsonify({"message":"all fields are required","statusCode":500}))
            # raise FieldsEmpty

        existingUser = User.objects(emailID = body['emailID'])
        if(existingUser):
            return make_response(jsonify({"message":"user already exists, try to login","statusCode":500}))
            # raise UserAlreadyExist

        if len(body['password']) <6:
            return make_response(jsonify({"message":"password is less than 6 characters","statusCode":500}))
            # raise PasswordIsShort

        if body['password'] != body['confirmPassword']:
            return make_response(jsonify({"message":"passwords doesnt match,please check","statusCode":500}))
            # raise UnAuthorized

        # print("body" + str(body))
    # except:
        print("entered")
        newUser = User(
            firstName=body['firstName'],
            lastName=body['lastName'],
            emailID=body['emailID'],
            password=body['password'],
            confirmPassword=body['confirmPassword']
        )
        newUser.hash_password()
        newUser.save()
        return make_response(jsonify(newUser['emailID'],{"statusCode":200}))


class UsersLogin(Resource):
    def post(self):
        body = request.get_json()
        user = User.objects.get(emailID = body['emailID'])
        # print(str(user))
        # try:
        if not user:
            return make_response(jsonify({"message":"user doesnt exists, please signup","statusCode":500}))
            # raise UserDoesntExist
        
        isAuthorized = user.check_password(body.get('password'))
        if not isAuthorized:
            return make_response(jsonify({"message":"password is incorrect,please try again","statusCode":500}))
            # raise UnAuthorized

        # expires = datetime.timedelta(days=7)
        # access_token=create_access_token(identity=str(user.id),expires_delta = expires)
        return make_response(jsonify(user['emailID'],{"message":"successfully logged in","statusCode":200}))
        # except:
            # raise InternalServerError