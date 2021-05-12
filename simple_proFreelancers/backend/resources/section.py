from flask import request,make_response,jsonify
from flask_restful import Resource

from database.models import Form,Section

class CreateForm(Resource):
    def post(self):
        body= request.get_json()

        form = Form()
        form.formTitle=body['formTitle']
        sectionsArray = body['sectionsArray']
        # print(sectionsArray)
        
        for i in range(len(sectionsArray)):
            section=Section(sectionTitle=sectionsArray[i]['sectionTitle'])
            form.sectionsArray.append(section)
       
        form.save()

        return make_response(jsonify(form))