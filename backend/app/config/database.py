import os
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def get_database_uri():
    user = os.getenv("DB_USER")
    password = os.getenv("DB_PASSWORD")
    host = os.getenv("DB_HOST")
    port = os.getenv("DB_PORT")
    dbname = os.getenv("DB_NAME")

    return f"postgresql://{user}:{password}@{host}:{port}/{dbname}"
