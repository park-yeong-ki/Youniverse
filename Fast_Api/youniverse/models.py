from sqlalchemy import Column, Integer, VARCHAR

from youniverse.database import declarative_base

Base = declarative_base()

class Test(Base):
    __tablename__ = "actor"

    actor_id = Column(Integer, nullable=False, autoincrement=True, primary_key=True)
    actor_image = Column(VARCHAR(255), nullable=False)
    actor_name = Column(VARCHAR(30), nullable=False)

class keyword(Base):
    __tablename__ = "keyword"

    keyword_id = Column(Integer, nullable=False, autoincrement=True, primary_key=True)
    keyword_name = Column(VARCHAR(10), nullable=False)
    source = Column(Integer, nullable=False)

class Member(Base):
    __tablename__ = "member"

    member_id = Column(Integer, nullable=False, autoincrement=True, primary_key=True)
    email = Column(VARCHAR(30), nullable=False)