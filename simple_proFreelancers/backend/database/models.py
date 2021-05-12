from flask_bcrypt import generate_password_hash, check_password_hash
import mongoengine as me

from .db import db

class User(db.Document):
    firstName = db.StringField(required=True)
    lastName=db.StringField(required=True)
    emailID = db.EmailField(required=True,unique=True)
    password = db.StringField(required=True,min_length=6)
    confirmPassword = db.StringField(required=True,min_length=6)
    role=db.IntField(default=0,required=False)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self,password):
        return check_password_hash(self.password,password)

# Inside the child , use me.EmbeddedDocument
class QuestionsAndPrizes(me.EmbeddedDocument):
    question = me.StringField()
    prize=me.FloatField()

#inside the parent add EmbeddedDocumentField(className)
class Items(me.EmbeddedDocument):
    ItemName = me.StringField()
    questionsAndPrizesArray=me.ListField(me.EmbeddedDocumentField(QuestionsAndPrizes))
   

class Section(me.EmbeddedDocument):
    sectionTitle = me.StringField(required=True)
    ItemsArray= me.ListField(me.EmbeddedDocumentField(Items))

    

class Form(me.Document):
    formTitle=me.StringField(required=True)
    sectionsArray = me.ListField(me.EmbeddedDocumentField(Section))




