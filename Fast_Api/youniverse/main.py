from fastapi import FastAPI, Depends, Path, HTTPException
from pydantic import BaseModel
from database import engineconn
from models import Test

app = FastAPI()

engine = engineconn()
session = engine.sessionmaker()

class Item(BaseModel):
    actor_image : str
    actor_name : str

@app.get("/")
async def first_get():
    example = session.query(Test).all()
    return example