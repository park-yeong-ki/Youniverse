from fastapi import APIRouter
from youniverse.repository import testRepository
from youniverse.schemas import youtube
import re
from konlpy.tag import Okt
from sklearn.feature_extraction.text import TfidfVectorizer
# import nltk
# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize
#
# # NLTK에서 불용어 다운로드
# nltk.download('stopwords')
# nltk.download('punkt')

router = APIRouter(
    prefix="/youtube",
    tags=["youtube"]
)

okt = Okt()

@router.get("/")
async def get_Test():
    corpus = [
        '이 채널에서는 IT 업계에서의 앱 개발자는 어떻게 하루를 보낼까 궁금해 하시는 분들을 위해서 만들어졌습니다.또한 저의 일상도 녹여져있으나 개발자, 개발자들 간의 소통도 취준생 및 채널을 방문해주시는 모든 분들 환영 합니다',
    ]

    # 전처리 수행
    preprocessed_corpus = [preprocess(text) for text in corpus]

    # 키워드 추출
    top_keywords = keyword(preprocessed_corpus)

    print("전처리 후 상위 키워드:", top_keywords)

@router.post("/")
async def data_get(data_request: youtube):
    received_data = data_request.data

    print("Received data:", received_data)
    return


# 전처리 함수
def preprocess(text):
    # 한글, 영문, 숫자를 제외한 모든 문자 제거
    text = re.sub(r'[^가-힣a-zA-Z0-9\s]', '', text)

    #불용어 처리
    # # 1. 불용어 라이브러리 nltk을 사용하고자 하였지만 제대로 처리되지 않아 불용어를 직접 넣어줬다.
    # stop_words = set(stopwords.words('english'))
    # words = word_tokenize(text)
    # words = [word for word in words if word.lower() not in stop_words]

    # 2. 불용어 제거, 필요에 따라 추가 가능
    stopwords = ['이', '는', '에서', '의', '을', '어떻게', '하시는', '분들', '해', '위해서', '만들어졌습니다', '또한', '저의', '녹여져있으나', '들', '간의', '및', '을', '해주시는', '모든', '합니다', '위해', '에서의', '에서는']
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