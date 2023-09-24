from sqlalchemy import *
from sqlalchemy.orm import sessionmaker

# 서버 DB
app = {
    'name': 'mysql+pymysql',
    'user': 'youniverse',
    'password': 'youniverse204',
    'host': 'j9b204.p.ssafy.io',
    'dbconn': 'youniverse',
    'port': '3306'
}
# 로컬 DB
# app = {
#     'name': 'mysql+pymysql',
#     'user': 'youniverse',
#     'password': '1234',
#     'host': '127.0.0.1',
#     'dbconn': 'youniverse',
#     'port': '3306'
# }

DB_URL = f'{app["name"]}://{app["user"]}:{app["password"]}@{app["host"]}:{app["port"]}/{app["dbconn"]}'

class engineconn:

    def __init__(self):
        self.engine = create_engine(DB_URL, pool_recycle = 500)

    def sessionmaker(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session

    def connection(self):
        conn = self.engine.connect()
        return conn

