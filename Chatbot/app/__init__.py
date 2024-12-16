# from flask import Flask

# def create_app():
#     app = Flask(__name__)

#     # Import the API blueprint
#     from .api import api_bp
#     app.register_blueprint(api_bp)

#     return app

from flask import Flask
from flask_cors import CORS  # Import CORS

def create_app():
    app = Flask(__name__)

    # Enable CORS for the entire app
    CORS(app)

    # Import the API blueprint
    from .api import api_bp
    app.register_blueprint(api_bp)

    return app

