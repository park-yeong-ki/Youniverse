from fastapi import APIRouter
from youniverse.repository import keywordRepository
from youniverse.schemas import youtube
import re
from konlpy.tag import Okt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
# from konlpy.tag import Komoran
# from konlpy.corpus import stopwords
#
# # 미리 정의된 한국어 불용어 목록 가져오기
# stopwords_ko = stopwords.words('English')

router = APIRouter(
    prefix="/youtube",
    tags=["youtube"]
)

okt = Okt()

@router.get("/test")
async def get_Test():
    corpus = [
        '이 채널에서는 IT 업계에서의 앱 개발자는 어떻게 하루를 보낼까 궁금해 하시는 분들을 위해서 만들어졌습니다.또한 저의 일상도 녹여져있으나 개발자, 개발자들 간의 소통도 취준생 및 채널을 방문해주시는 모든 분들 환영 합니다',
    ]

    # 전처리 수행
    preprocessed_corpus = [preprocess(text) for text in corpus]

    # 키워드 추출
    top_keywords = keyword(preprocessed_corpus)

    print("전처리 후 상위 키워드:", top_keywords)

    #키워드 저장
    # keywordRepository.save_youtube_keyword("gkathaud4884@gmail.com", top_keywords)

    # 코사인 유사도 계산
    result_keywords = similarily(top_keywords)

    print("코사인 유사도 상위 키워드:", result_keywords)

@router.get("/")
async def data_get(data_request: youtube):
    top_keywords = keywordRepository.get_youtube_keyword(data_request.email)
    return "success"

@router.post("/")
async def data_post(data_request: youtube):
    corpus = [
        data_request.data
    ]

    # 전처리 수행
    preprocessed_corpus = [preprocess(text) for text in corpus]

    # 키워드 추출
    top_keywords = keyword(preprocessed_corpus)

    print("전처리 후 상위 키워드:", top_keywords)

    #키워드 저장
    keywordRepository.save_youtube_keyword(data_request.email, top_keywords)

    # 코사인 유사도 계산
    result_keywords = similarily(top_keywords)

    print("코사인 유사도 상위 키워드:", result_keywords)

    return "success"

@router.put("/")
async def data_update(data_request: youtube):
    corpus = [
        data_request.data
    ]

    # 전처리 수행
    preprocessed_corpus = [preprocess(text) for text in corpus]

    # 키워드 추출
    top_keywords = keyword(preprocessed_corpus)

    print("전처리 후 상위 키워드:", top_keywords)

    #키워드 업데이트
    keywordRepository.update_youtube_keyword(data_request.email, top_keywords)

    # 코사인 유사도 계산
    result_keywords = similarily(top_keywords)

    print("코사인 유사도 상위 키워드:", result_keywords)

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
                  '에서', '의', '어떻게', '하시는', '분들', '해', '위해서', '만들어졌습니다', '또한', '저의', '녹여져있으나', '간의', '및', '해주시는', '모든', '합니다', '위해', '에서의', '에서는']
    words = okt.morphs(text)
    words = [word for word in words if word not in stopwords]

    return ' '.join(words)

# 키워드 추출 함수
def keyword(preprocessed_corpus):
    # TF-IDF 벡터화 객체 생성
    tfidf_vectorizer = TfidfVectorizer()

    # TF-IDF 벡터화 수행
    tfidf_matrix = tfidf_vectorizer.fit_transform(preprocessed_corpus)

    # 키워드와 TF-IDF 점수 추출
    feature_names = tfidf_vectorizer.get_feature_names_out()
    tfidf_scores = tfidf_matrix[0].toarray()[0]

    # TF-IDF 점수가 높은 순으로 정렬하여 상위 키워드 추출
    top_keywords = [feature_names[i] for i in tfidf_scores.argsort()[::-1][:10]]

    return top_keywords

def similarily(top_keywords):
    # TF-IDF 벡터화 객체 생성
    tfidf_vectorizer = TfidfVectorizer()

    # tmdb 데이터
    tmdb_keyword = keywordRepository.get_tmdb_keyword()

    # top_keywords와 TMDB 키워드 데이터를 하나의 리스트로 합침
    all_keywords = top_keywords + tmdb_keyword

    # TF-IDF 벡터화 수행
    tfidf_matrix = tfidf_vectorizer.fit_transform(all_keywords)

    # 코사인 유사도 계산
    cosine_similarities = cosine_similarity(tfidf_matrix)

    # top_keywords와 TMDB 키워드 데이터 간의 유사도 추출
    top_keywords_similarity = cosine_similarities[:len(top_keywords), len(top_keywords):]

    # 유사도를 기준으로 상위 10개 TMDB 키워드 추출
    similar_tmdb_keywords_indices = top_keywords_similarity.argsort()[0][::-1][:10]
    similar_tmdb_keywords = [tmdb_keyword[i] for i in similar_tmdb_keywords_indices]

    return similar_tmdb_keywords