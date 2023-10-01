from youniverse import models
from youniverse.database import engineconn

engine = engineconn()
session = engine.sessionmaker()

# tmdb 키워드 가져오기
def get_tmdb_keyword():
    results = session.query(models.Keyword.keyword_name).filter(models.Keyword.source == 0).all()
    return [result[0] for result in results]
