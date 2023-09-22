from sqlalchemy import Column, ForeignKey, Integer, VARCHAR, FLOAT, TIMESTAMP, BIGINT, TEXT, Boolean, JSON

from app.youniverse.database import declarative_base

Base = declarative_base()

class Test(Base):
    __tablename__ = "actor"

    actor_id = Column(Integer, nullable=False, autoincrement=True, primary_key=True)
    actor_image = Column(VARCHAR(255), nullable=False)
    actor_name = Column(VARCHAR(30), nullable=False)