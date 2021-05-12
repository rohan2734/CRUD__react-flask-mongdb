from .user import  UsersLogin, UsersSignup
from .section import CreateForm

def initialize_routes(api):
    api.add_resource(UsersSignup,'/api/signup')
    api.add_resource(UsersLogin,'/api/login')
    api.add_resource(CreateForm,'/api/createForm')
