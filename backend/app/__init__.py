import os

from flask import Flask

from dotenv import load_dotenv

from flask_cors import CORS

from app.config.database import (
    db,
    get_database_uri
)

load_dotenv()

def create_app():

    app = Flask(__name__)

    CORS(app)

    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = get_database_uri()

    app.config[
        "SQLALCHEMY_TRACK_MODIFICATIONS"
    ] = False

    db.init_app(app)

    from app.routes.task_routes import task_bp

    app.register_blueprint(
        task_bp,
        url_prefix="/api"
    )

    return app
