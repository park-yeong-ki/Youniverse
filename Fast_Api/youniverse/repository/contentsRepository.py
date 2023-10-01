from youniverse import models
from youniverse.database import engineconn

engine = engineconn()
session = engine.sessionmaker()

# tmdb 키워드 가져오기
def get_tmdb_keyword():
    results = session.query(models.Keyword.keyword_name).filter(models.Keyword.source == 0).all()
    return [result[0] for result in results]

#키워드가 있는 영화의 id가져오기
def get_movie_ids_by_keyword(session, keyword_name):
     # 키워드 이름을 통해 keyword_id 가져오기
    keyword_id_result = session.query(Keyword.keyword_id).filter_by(keyword_name=keyword_name).first()

    if not keyword_id_result:
        return []

    keyword_id = keyword_id_result[0]

    # 해당 keyword_id를 포함하는 KeywordMovie 항목을 조회하여 movie_id 목록을 가져오기
    movie_ids = session.query(KeywordMovie.movie_id).filter_by(keyword_id=keyword_id).all()

    # movie_ids는 리스트의 튜플 형태 [(id1,), (id2,), ...]이므로 일반 리스트 형태로 변환
    movie_ids = [item[0] for item in movie_ids]

    return movie_ids
