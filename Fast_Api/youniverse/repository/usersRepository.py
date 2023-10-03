from youniverse import models
from youniverse.database import engineconn

engine = engineconn()
session = engine.sessionmaker()

# 내 키워드 가져오기
def get_keyword(member_id_to_fetch):
    myKeywords = [row[0] for row in session.query(models.YoutubeKeyword.youtube_keyword_name).filter_by(member_id=member_id_to_fetch).order_by(models.YoutubeKeyword.movie_rank).all()]

    return myKeywords

# 모든 회원의 키워드 가져오기 (내 것 제외)
def get_member_keyword(member_id_to_fetch):
    all_members = session.query(models.YoutubeKeyword.member_id, models.YoutubeKeyword.youtube_keyword_name) \
        .filter(models.YoutubeKeyword.member_id != member_id_to_fetch) \
        .order_by(models.YoutubeKeyword.member_id, models.YoutubeKeyword.movie_rank) \
        .all()
    member_keywords = {}

    for member_id, keyword_name in all_members:
        if member_id not in member_keywords:
            member_keywords[member_id] = []
        member_keywords[member_id].append(keyword_name)

    return member_keywords

# 사용자 id를 이용해 사용자 정보 모두 뽑기
def get_members_info(member_ids):
    users = session.query(models.Member).filter(models.Member.member_id.in_(member_ids)).all()

    users_info = []

    for user in users:
        user_info = {
            "member_id": user.member_id,
            "age": user.age,
            "email": user.email,
            "gender": user.gender,
            "introduce": user.introduce,
            "member_image": user.member_image,
            "nickname": user.nickname
        }
        users_info.append(user_info)

    return users_info
