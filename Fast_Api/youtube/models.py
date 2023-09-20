from sqlalchemy import Column, TEXT, INT
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

#유튜브 키워드 매칭 모델
class Test(Base):
    __tablename__ = "actor"

    actor_id = Column(INT, nullable=False, autoincrement=True, primary_key=True)
    actor_image = Column(TEXT, nullable=False)
    actor_name = Column(TEXT, nullable=False)