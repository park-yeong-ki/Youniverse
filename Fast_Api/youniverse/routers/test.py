from fastapi import APIRouter
from youniverse.repository import testRepository

router = APIRouter(
    prefix="/test",
    tags=["test"]
)

@router.get("/")
async def first_get():
    return "배포 확인"