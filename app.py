from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "<h1>Hello World</h1>"

@app.route('/<string:name>')
def greet(name):
    return 'Hello {name} '


if __name__ == '__main__':
    app.run(debug=True)