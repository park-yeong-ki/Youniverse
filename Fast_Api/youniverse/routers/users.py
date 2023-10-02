from fastapi import APIRouter
from youniverse.recommend import user

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.get("/test")
async def get_Test():
    member_id = 1

    # 사용자 필터링
    result_users = user.similarily(member_id)

    # 결과 값을 바탕으로 회원정보 리턴
    return user.get_members_info(result_users)

@router.get("/")
async def get_Users(member_id: int):
    # 사용자 필터링
    result_users = user.similarily(member_id)

    # 결과 값을 바탕으로 회원정보 리턴
    return user.get_members_info(result_users)

