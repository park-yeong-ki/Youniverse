from youniverse import models
from youniverse.database import engineconn

engine = engineconn()
session = engine.sessionmaker()

def save_keyword(email, data):
    member_id = find_member_id_by_email(email)

    # member_id가 존재하는 경우, 연관된 keyword를 저장
    if member_id:
        for item in data:
            keyword_to_save = models.keyword(keyword_name=item, source=1)
            session.add(keyword_to_save)
        session.commit()
        print(f"Keyword saved for member_id")
    else:
        print(f"Member with email not found.")

    return session.query(models.Test).all()

def update_keyword(email, data):
    member_id = find_member_id_by_email(email)

def get_keyword(email):
    member_id = find_member_id_by_email(email)

# 이메일을 조회할 함수 정의
def find_member_id_by_email(email):
    member = session.query(models.Member).filter_by(email=email).first()
    if member:
        return member.member_id
    else:
        return None