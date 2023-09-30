from sqlalchemy import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# 서버 DB
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://youniverse:youniverse204@j9b204.p.ssafy.io:3306/youniverse"

# 로컬 DB
# SQLALCHEMY_DATABASE_URL = "mysql+pymysql://youniverse:1234@127.0.0.1:3306/youniverse"

class engineconn:

    def __init__(self):
        self.engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_recycle = 500)

    def sessionmaker(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session

    def connection(self):
        conn = self.engine.connect()
        return conn
