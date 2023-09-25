from youniverse import models
from youniverse.database import engineconn

engine = engineconn()
session = engine.sessionmaker()

def get_test():
    return session.query(models.Test).all()