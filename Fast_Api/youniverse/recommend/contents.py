from youniverse.repository import contentsRepository
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# 키워드 추출 함수
def getKeyword(preprocessed_corpus):
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

# 코사인 유사도 추출 함수
def similarily(top_keywords):
    # TF-IDF 벡터화 객체 생성
    tfidf_vectorizer = TfidfVectorizer()

    # tmdb 데이터
    tmdb_keyword = contentsRepository.get_tmdb_keyword()

    # top_keywords와 TMDB 키워드 데이터를 하나의 리스트로 합침
    all_keywords = top_keywords + tmdb_keyword

    # TF-IDF 벡터화 수행
    tfidf_matrix = tfidf_vectorizer.fit_transform(all_keywords)

    # 코사인 유사도 계산
    cosine_similarities = cosine_similarity(tfidf_matrix)

    # top_keywords와 TMDB 키워드 데이터 간의 유사도 추출
    top_keywords_similarity = cosine_similarities[:len(top_keywords), len(top_keywords):]

    # 유사도 높은 순으로 저장
    similar_tmdb_keywords = []

    # 각 키워드별로 유사도가 0.0이 아닌 것 중에서 높은 순서대로 나열
    for i, keyword in enumerate(top_keywords):
        # 해당 키워드와의 유사도 값 가져오기
        keyword_similarity = top_keywords_similarity[i]
        # 0.0이 아닌 유사도 값 중에서 내림차순 정렬하여 인덱스를 반환
        sorted_indices = np.argsort(keyword_similarity)[::-1]
        # 유사도가 0.0이 아닌 상위 10개 키워드 출력
        for index in sorted_indices:
            similarity = keyword_similarity[index]
            if similarity != 0.0:
                similar_keyword = tmdb_keyword[index]
                similar_tmdb_keywords.append(tmdb_keyword[index])
                print(f"'{keyword}' <-> '{similar_keyword}': {similarity}")

    return similar_tmdb_keywords
