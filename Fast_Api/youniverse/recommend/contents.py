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
    # 모든 문서에 대한 TF-IDF 점수를 추출하여 2D 배열로 저장
    tfidf_scores = tfidf_matrix.toarray()

    # 모든 키워드와 점수를 추출
    all_keywords_check = [{"keyword": feature_names[i], "score": tfidf_scores[0][i]} for i in range(len(feature_names))]

    # TF-IDF 점수를 높은순으로 정렬
    all_keywords_check.sort(key=lambda x: x["score"], reverse=True)

    for keyword_info in all_keywords_check:
        print(f"Keyword: {keyword_info['keyword']}, Score: {keyword_info['score']}")

    # 상위 20개 키워드 추출
    top_keywords = [keyword_info['keyword'] for keyword_info in all_keywords_check[:20]]

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



def get_movie_ids(result_keywords):
    distinct_movie_ids = set()
    for keyword in result_keywords:
        movie_ids = contentsRepository.get_movie_ids_by_keyword(keyword)
        distinct_movie_ids.update(movie_ids)
    return list(distinct_movie_ids)