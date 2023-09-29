from fastapi import APIRouter
from youniverse.repository import testRepository
from youniverse.schemas import youtube
import re
from sklearn.feature_extraction.text import TfidfVectorizer
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# NLTK에서 불용어 다운로드
nltk.download('stopwords')
nltk.download('punkt')

router = APIRouter(
    prefix="/youtube",
    tags=["youtube"]
)



@router.post("/")
async def data_get(data_request: youtube):
    received_data = data_request.data

    print("Received data:", received_data)
    return


# 전처리 함수 정의
def preprocess(text):
    # 한글, 영문, 숫자를 제외한 모든 문자 제거
    text = re.sub(r'[^가-힣a-zA-Z0-9\s]', '', text)

    #불용어 처리
    # # 1. 불용어 라이브러리 nltk을 사용하고자 하였지만 제대로 처리되지 않아 불용어를 직접 넣어줬다.
    # stop_words = set(stopwords.words('english'))
    # words = word_tokenize(text)
    # words = [word for word in words if word.lower() not in stop_words]

    # 2. 불용어 제거, 필요에 따라 추가 가능
    stopwords = ['이', '는', '에서', '의', '을', '어떻게', '하시는', '분들', '위해서', '만들어졌습니다', '또한', '저의', '녹여져있으나', '들', '간의', '및', '을', '해주시는', '모든', '합니다', '위해', '에서의', '에서는']
    words = okt.morphs(text)
    words = [word for word in words if word not in stopwords]

    return ' '.join(words)