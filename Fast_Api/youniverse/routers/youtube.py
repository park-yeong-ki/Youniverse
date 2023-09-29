from fastapi import APIRouter
from youniverse.repository import testRepository
from youniverse.schemas import youtube

router = APIRouter(
    prefix="/youtube",
    tags=["youtube"]
)

@router.get("/")
async def get_Test():
    received_data ="이 채널에서는 IT 업계에서의 앱 개발자는 어떻게 하루를 보낼까 궁금해 하시는 분들을 위해서 만들어졌습니다.또한 저의 일상도 녹여져있으나, 개발자들 간의 소통도 취준생 및 채널을 방문해주시는 모든 분들 환영 합니다"
    return received_data

@router.post("/")
async def first_get(data_request: youtube):
    received_data = data_request.data

    print("Received data:", received_data)
    return