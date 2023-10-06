import datetime
from pydantic import BaseModel

class Test(BaseModel):
    actor_image: str
    actor_name: str

class youtube(BaseModel):
    data: str
    email: str
