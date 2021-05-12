
class InternalServerError(Exception):
    pass
class UserAlreadyExist(Exception):
    pass
class UnAuthorized(Exception):
    pass
class UserDoesntExist(Exception):
    pass
class FieldsEmpty(Exception):
    pass
class PasswordIsShort(Exception):
    pass

errors={
    "InternalServerError": {
        "message": "Something went wrong",
        "status": 500
    },
    "UserAlreadyExist":{
        "message":"user already exist,try to login",
        "status": 500
    },
    "UnAuthorized":{
        "message":"passwords dont match",
        "status":500
    },
    "FieldsEmpty":{
        "message":"Fields should not be empty",
        "status":500
    },
    "PasswordIsShort":{
        "message":"password must not be less than 6 characters",
        "status":500
    },
    "UserDoesntExist":{
        "message":"user doesnt exist",
        "status":500
    }
}