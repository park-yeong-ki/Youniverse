from app.youniverse import models
from app.youniverse.database import engineconn

engine = engineconn()
session = engine.sessionmaker()

def get_test():
    return session.query(models.Test).all()