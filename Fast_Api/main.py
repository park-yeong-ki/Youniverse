from fastapi import FastAPI
from youniverse.routers import youtube
from youniverse.routers import users
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://j9b204.p.ssafy.io:3000",
]

# CORS 미들웨어를 추가하고 원하는 도메인 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 이후 FastAPI 엔드포인트와 라우터 정의
app.include_router(youtube.router)
app.include_router(users.router)

@app.get("/", tags=["get"])
async def get_Test():
    return "hello python"