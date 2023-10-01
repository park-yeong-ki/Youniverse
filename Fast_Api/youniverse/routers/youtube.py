from fastapi import APIRouter
from youniverse.schemas import youtube
import re
from konlpy.tag import Okt
from youniverse.recommend import contents
from youniverse.recommend import user
import requests
import json

# Spring URL
springUrl = "https://j9b204.p.ssafy.io/api/keywords/register"

router = APIRouter(
    prefix="/youtube",
    tags=["youtube"]
)

okt = Okt()

@router.get("/test")
async def get_Test():
    corpus = [
        '유튜브 알고리즘은 사용자에게 최적화된 비디오 콘텐츠를 제공하기 위한 시스템으로, 다양한 요소를 고려하여 작동합니다. 이 시스템은 유튜브 플랫폼에서 수 많은 비디오 중에서 사용자에게 최적의 콘텐츠를 추천하는 데 사용됩니다'
        '대출과 관련된 긴 문장을 추천해드릴 수 있습니다. 그러나 좀 더 구체적인 내용이나 대출 종류, 상황에 대한 정보를 제공해주시면, 해당 내용에 맞는 긴 문장을 더 정확하게 추천해 드릴 수 있습니다. 대출 목적, 금액, 상환 조건, 이자율, 대출 기간 등과 관련된 정보를 공유해주시면 도움을 드릴 수 있습니다. 어떤 종류의 대출 문장을 원하시는지 더 자세한 정보를 부탁드립니다',
    ]

    # 전처리 수행
    preprocessed_corpus = [preprocess(text) for text in corpus]

    # 키워드 추출
    top_keywords = contents.getKeyword(preprocessed_corpus)
    print("youtube 분석 상위 키워드:", top_keywords)

    # top_keywords 배열에서 상위 키워드 8개만 추출
    top_send_keywords = top_keywords[:8]

    # youtube 분석 상위 키워드 결과 보내기
    # dataObject(top_send_keywords, 2, 'gkathaud4884@gmail.com')

    # 코사인 유사도 계산
    result_keywords = contents.similarily(top_keywords)
    print("코사인 유사도 결과 tmdb 키워드:", result_keywords)

    # 코사인 유사도 결과 키워드 보내기
    # dataObject(result_keywords, 2, 'gkathaud4884@gmail.com')

    # 사용자 필터링
    result_users = user.similarily(top_keywords,'gkathaud4884@gmail.com')
    print("사용자 필터링을 통한 결과:")
    for email, similarity_score in result_users:
        print(f"{email} (유사도: {similarity_score:.2f})")

    # 사용자 필터링 결과 사용자 보내기
    # dataObject(result_users, 2, 'gkathaud4884@gmail.com')

@router.post("/")
async def data_post(data_request: youtube):
    corpus = [
        data_request.data
    ]
    # 전처리 수행
    preprocessed_corpus = [preprocess(text) for text in corpus]

    # 키워드 추출
    top_keywords = contents.getKeyword(preprocessed_corpus)
    print("youtube 분석 상위 키워드:", top_keywords)

    # top_keywords 배열에서 상위 키워드 8개만 추출
    top_send_keywords = top_keywords[:8]

    # youtube 분석 상위 키워드 결과 보내기
    dataObject(top_send_keywords, 1, data_request.email)

    # 코사인 유사도 계산
    result_keywords = contents.similarily(top_keywords)
    print("아이템 콘텐츠 필터링 결과:", result_keywords)

    # 코사인 유사도 결과 키워드 보내기
    dataObject(result_keywords, 2, data_request.email)

    # 사용자 필터링
    result_users = user.similarily(top_keywords,'gkathaud4884@gmail.com')
    print("사용자 콘텐츠 필터링 결과:")
    for email, similarity_score in result_users:
        print(f"{email} (유사도: {similarity_score:.2f})")

    return "success"


# 전처리 함수
def preprocess(text):
    # 한글, 영문, 숫자를 제외한 모든 문자 제거
    text = re.sub(r'[^가-힣a-zA-Z0-9\s]', '', text)

    # 1. KoNLPy 불용어 목록 제거 및 Komoran 라이브러리를 이용한 불용어 처리
    # komoran = Komoran()
    # ko_words = komoran.morphs(text)
    # filtered_ko_words = [word for word in ko_words if word not in stopwords_ko]
    # filtered_ko_text = ' '.join(filtered_ko_words)

    # 2. 불용어 제거, 필요에 따라 추가 가능
    # -> 한국어는 특성상 따로 불용어 리스트 라이브러리가 존재하지 않는다
    stopwords = ['은', '는', '이', '가', '을', '를', '에서', '의', '하', '아', '하시', '어', '에서는', '되', '면', '된', '또한', '하', '도', '들', '간', '및', '을', '읽어', '에서', '해주시', '환영', '합니다',
                  '에서', '의', '어떻게', '하시는', '분들', '해', '위해서', '만들어졌습니다', '또한', '저의', '녹여져있으나', '간의', '및', '해주시는', '모든', '합니다', '위해', '에서의', '에서는', '있습니다', '드릴'
                 '에게', '해주시면', '고려', '됩니다', '하기', '하는', '해당', '해드릴', '맞는', '그러나', '대한', '많은', '으로', '자세한', '하게', '드릴', '에게', '부탁드립니다', '이나', '하여']
    words = okt.morphs(text)
    words = [word for word in words if word not in stopwords]

    return ' '.join(words)

def dataObject(result_keywords, source, email):
    for i, result_keyword in enumerate(result_keywords):
        data = {
            "keywordName": result_keyword,
            "source": source,
            "email": email,
            "rank": i # 1부터 시작
        }
        axiosRequest(data)

def axiosRequest(data):
    # JSON 데이터를 문자열로 직렬화
    payload = json.dumps(data)

    # POST 요청 보내기
    response = requests.post(springUrl, data=payload, headers={"Content-Type": "application/json"})

    # 응답 확인
    if response.status_code == 200:
        response_data = response.json()  # 서버에서 반환한 JSON 데이터 파싱
        print("응답 데이터:", response_data)
    else:
        print("요청이 실패했습니다. 상태 코드:", response.status_code)