from fastapi import FastAPI
from youtube import api

def include_router(app):
    app.include_router(api.router, prefix='/main')

def start_application():
    app = FastAPI()
    include_router(app)
    return app

app = start_application()

# GET / 경로에 대한 핸들러 추가
@app.get("/", tags=["get"])
async def root():
    return "Hello, World!"