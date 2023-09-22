from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.youniverse.routers import test

def include_router(app):
    app.include_router(test.router)


app = FastAPI()
include_router(app)

@app.get("/", tags=["get"])
async def get_Test():
    return "hello python"