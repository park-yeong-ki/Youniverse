from youniverse import models
from youniverse.database import engineconn

engine = engineconn()
session = engine.sessionmaker()

# 모든 회원의 키워드 가져오기 (내 이메일 제외)
def get_member_keyword(myEmail):
    all_members = session.query(models.Member.member_id, models.Keyword.keyword_name).select_from(models.Member).join(models.KeywordMember, models.KeywordMember.member_id == models.Member.member_id).join(models.Keyword, models.KeywordMember.keyword_id == models.Keyword.keyword_id).filter(
        models.Member.email != myEmail).all()
    member_keywords = {}

    for member_id, keyword_name in all_members:
        if member_id not in member_keywords:
            member_keywords[member_id] = []
        member_keywords[member_id].append(keyword_name)

    return member_keywords


