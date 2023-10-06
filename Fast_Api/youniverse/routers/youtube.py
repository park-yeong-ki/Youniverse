from fastapi import APIRouter
from youniverse.schemas import youtube
import re
from konlpy.tag import Okt
from youniverse.recommend import contents
import requests
import json
import random

router = APIRouter(
    prefix="/youtube",
    tags=["youtube"]
)

okt = Okt()

@router.post("/test")
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

    # top_keywords 배열에서 상위 키워드 10개만 추출
    top_send_keywords = top_keywords[:10]

    # youtube 분석 상위 키워드 결과 보내기
    result = youtubeDataObject(top_send_keywords, 'gkathaud4884@gmail.com')
    # 결과 확인
    if result == "fail":
        print("작업이 실패하였습니다.")
        return "fail"
    top_keywords = ["영상", "광고", "운동", "리수", "낭술", "간지", "할머니", "영어", "일상", "한국"]

    # 코사인 유사도 계산
    result_keywords = contents.similarily(top_keywords)
    print("코사인 유사도 결과 tmdb 키워드:", result_keywords)

    # result_keywords를 통해 영화 ID 목록 가져오기
    movie_ids = contents.get_movie_ids(result_keywords)
    print("추천 영화 목록 개수: "+str(len(movie_ids))+", 영화 id 목록:", movie_ids)

    # 코사인 유사도 결과 키워드 결과 보내기
    result2 = movieDataObject(movie_ids,  'gkathaud4884@gmail.com')
    if result2 == "fail":
        print("작업이 실패하였습니다.")
        return "fail"

    return "success"

@router.post("/data")
async def data_post(request_data: youtube):
    corpus = [
        request_data.data
    ]
    print("request.data: ",request_data.data)
    print("request.data: ", request_data.email)
    # 전처리 수행
    preprocessed_corpus = [preprocess(text) for text in corpus]

    # 키워드 추출
    top_keywords = contents.getKeyword(preprocessed_corpus)
    print("youtube 분석 상위 키워드:", top_keywords)

    # top_keywords 배열에서 상위 키워드 10개만 추출
    top_send_keywords = top_keywords[:10]

    # top_send_keywords 리스트를 랜덤하게 섞음
    random.shuffle(top_send_keywords)

    # youtube 분석 상위 키워드 결과 보내기
    result = youtubeDataObject(top_send_keywords, request_data.email)
    if result == "fail":
        print("작업이 실패하였습니다.")
        return "fail"

    # 코사인 유사도 계산
    result_keywords = contents.similarily(top_keywords)
    print("코사인 유사도 결과 tmdb 키워드:", result_keywords)

    # result_keywords를 통해 영화 ID 목록 가져오기
    movie_ids = contents.get_movie_ids(result_keywords)
    print("추천 영화 목록 개수: "+str(len(movie_ids))+", 영화 id 목록:", movie_ids)

    # 코사인 유사도 결과 키워드 결과 보내기
    result2 = movieDataObject(movie_ids,  request_data.email)
    if result2 == "fail":
        print("작업이 실패하였습니다.")
        return "fail"

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
                 '에게', '해주시면', '고려', '됩니다', '하기', '하는', '해당', '해드릴', '맞는', '그러나', '대한', '많은', '으로', '자세한', '하게', '드릴', '에게', '부탁드립니다', '이나', '하여', '포함', '이드',
                 "홍드로", "숏츠", "커버", "러쉬", "아무", "관전", "통해", "보기", "다시", "록맨",
                 "메가맨", "홈페이지", "답변", "살기", "설명", "우리", "단순", "모음", "실제", "간접",
                 "강림", "당황", "업로드", "이번", "자발", "제공", "플러스", "가장", "기내", "모습",
                 "사용", "월화", "패턴", "프리미엄", "현직", "개쩌", "김형", "드림", "로우", "무하마드",
                 "박서준", "보이", "사실", "샌디에고", "안류", "여러분", "오늘", "인정", "일밤", "괴발",
                 "그대", "독자", "등장", "레이", "로스트", "로크", "마이", "메일", "무료", "수목",
                 "스틸", "에스", "에크스", "역대", "오후", "은우", "의심", "이름", "일생", "자산어보",
                 "중인", "지금", "진짜", "차단", "최고", "한번", "해소", "간다", "감사", "감탄",
                 "강추", "강풀", "개념", "개봉", "거미", "경이", "그냥", "그녀", "그대로", "그동안",
                 "기본", "기획", "끝장", "난리", "담당", "당한", "동사", "동석", "동안", "딜리버리맨",
                 "라네즈", "로그", "로부터", "릴파", "매일", "메리", "모닝", "몸종", "무한", "미씽",
                 "믹스", "방향", "베이지", "벨벳", "봉인", "부탁", "분량", "비교", "비난", "새끼",
                 "생도", "설윤", "설치", "숏몽", "수준", "시엘", "시연", "시절", "심수", "심혈",
                 "안보", "어사", "업종", "엑스", "오픈", "요즘", "우영", "워터", "월차", "이의",
                 "잠깐", "저격", "정민", "주우", "중반", "카피", "켠왕", "코스", "클렌", "토일",
                 "투어", "티비엔", "플루", "피스", "가지", "개국", "갸꿀잼", "거대", "거듭", "거지",
                 "거미", "경이", "그냥", "그녀", "그대로", "그동안", "기본", "기획", "끝장", "난리",
                 "담당", "당한", "동사", "동석", "동안", "딜리버리맨", "라네즈", "로그", "로부터", "릴파",
                 "매일", "메리", "모닝", "몸종", "무한", "무드키", "무려", "무조건", "묶음", "바이",
                 "보유", "부리", "부수", "부스", "블러", "빨린", "삘받아", "사와코", "산신", "살짝",
                 "상놈", "상대", "서로", "세번", "소집", "수가", "수단", "수로", "쉬반", "저희", "유료", "광고", "영상", "저작권", "구독", "하루",
                 "반응", "테크", "노마드", "브이", "튜브", "유", "허가", "댓글", "좋아요", "알람", "문제", "방법", "이유", "제품", "제품", "무상", "버전", "비긴", "어게인"
                 "최적", "노출", "요소", "시스템", "작동", "자주", "미국인", "문장", "표현", "내용", "쇼츠", "콘텐츠", "종류", "관련"
                 ]
    words = okt.nouns(text)
    words = [word for word in words if word not in stopwords]

    return ' '.join(words)

def youtubeDataObject(result_keywords, email):
    ranked_keywords = []
    print("result_keywords: " + ", ".join(result_keywords))
    # 순위 생성
    for i, result_keyword in enumerate(result_keywords):
        keyword_data = {
            "youtubeKeywordName": result_keyword,
            "movieRank": i + 1  # 1부터 시작
        }
        print(keyword_data)
        ranked_keywords.append(keyword_data)

    # ranked_keywords 리스트를 랜덤하게 섞음
    random.shuffle(ranked_keywords)

    data = {
        "youtubeKeywordList": ranked_keywords,
        "email": email
    }
    return axiosRequest(data,"/youtube-keyword/update")

def movieDataObject(dataList, email):
    data = {
        "movieIdList": dataList,
        "email": email
    }
    return axiosRequest(data,"/recommend-movies/update")


def axiosRequest(data, url):
    # JSON 데이터를 문자열로 직렬화
    payload = json.dumps(data)

    # POST 요청 보내기
    response = requests.post('https://j9b204.p.ssafy.io/api'+url, data=payload, headers={"Content-Type": "application/json"})

    # 응답 확인
    if response.status_code == 200:
        print("요청 성공")
        return "success"
    else:
        print("요청 실패. 상태 코드:", response.status_code)
        return "fail"