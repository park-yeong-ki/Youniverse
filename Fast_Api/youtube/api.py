from fastapi import APIRouter
from pydantic import BaseModel
from database import engineconn
from youtube.models import Test

router = APIRouter()
engine = engineconn()
session = engine.sessionmaker()

# class Item(BaseModel):
#     actor_image : str
#     actor_name : str
#
@router.get("/", tags=["get"])
async def first_get():
    example = session.query(Test).all()
    return example

# @router.post("/post")
# async def first_post(item:Item):
#     #데이터 추가
#     addMemo = Test(image = item.actor_image, name = item.actor_name)
#     session.add(addMemo)
#     session.commit()
#     return item