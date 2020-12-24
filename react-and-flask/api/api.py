from flask import Flask

app = Flask(__name__)

@app.route('/',mehods=['GET'])
def index():
    return{
        'name':'Hello world'
    }

if __name__ == '__main__':
    app.run(debug=True)