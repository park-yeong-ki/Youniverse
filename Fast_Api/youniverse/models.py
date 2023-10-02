from sqlalchemy import Column, Integer, VARCHAR, ForeignKey
from sqlalchemy.orm import relationship
from youniverse.database import declarative_base

Base = declarative_base()

class Test(Base):
    __tablename__ = "actor"

    actor_id = Column(Integer, nullable=False, autoincrement=True, primary_key=True)
    actor_image = Column(VARCHAR(255), nullable=False)
    actor_name = Column(VARCHAR(30), nullable=False)

class Keyword(Base):
    __tablename__ = "keyword"

    keyword_id = Column(Integer, nullable=False, autoincrement=True, primary_key=True)
    keyword_name = Column(VARCHAR(10), nullable=False)

    movies = relationship("KeywordMovie", back_populates="keyword")

class Member(Base):
    __tablename__ = "member"

    member_id = Column(Integer, nullable=False, autoincrement=True, primary_key=True)
    email = Column(VARCHAR(30), nullable=False)

class KeywordMember(Base):
    __tablename__ = "keyword_member"

    keyword_member_id = Column(Integer, nullable=False, autoincrement=True, primary_key=True)
    keyword_id = Column(Integer, ForeignKey('keyword.keyword_id'), nullable=False)  # Keyword 모델의 기본 키를 참조
    member_id = Column(Integer, ForeignKey('member.member_id'), nullable=False)

    # Keyword와의 관계 정의
    keyword = relationship("Keyword", back_populates="members")

    # Member와의 관계 정의
    member = relationship("Member", back_populates="keywords")

# Keyword 모델에 members 역참조 관계 정의
Keyword.members = relationship("KeywordMember", back_populates="keyword")

# Member 모델에 keywords 역참조 관계 정의
Member.keywords = relationship("KeywordMember", back_populates="member")


class Movie(Base):
    __tablename__ = "movie"

    movie_id = Column(Integer, nullable=False, autoincrement=False, primary_key=True)
    title = Column(VARCHAR(100), nullable=False)

class KeywordMovie(Base):
    __tablename__ = "keyword_movie"

    keyword_movie_id = Column(Integer, nullable=False, autoincrement=True, primary_key=True)
    keyword_id = Column(Integer, ForeignKey('keyword.keyword_id'), nullable=False)
    movie_id = Column(Integer, ForeignKey('movie.movie_id'), nullable=False)

    # Keyword와의 관계 정의
    keyword = relationship("Keyword", back_populates="movies")

    # Movie와의 관계 정의
    movie = relationship("Movie", back_populates="keywords")

# Movie 모델에 keywords 역참조 관계 정의
Movie.keywords = relationship("KeywordMovie", back_populates="movie")
