from flask import Flask

app = Flask(__name__)

@app.route('/api',methods=['GET'])
def index():
    return{
        # 'name':'Hello world'
        'name':['orange','apple']
    }

if __name__ == '__main__':
    app.run(debug=True)