from youniverse.repository import contentsRepository
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


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

    # 유사도를 기준으로 상위 10개 TMDB 키워드 추출
    similar_tmdb_keywords_indices = top_keywords_similarity.argsort()[0][::-1][:10]
    similar_tmdb_keywords = [tmdb_keyword[i] for i in similar_tmdb_keywords_indices]

    return similar_tmdb_keywords



def get_movie_ids(result_keywords):
    distinct_movie_ids = set()
    for keyword in result_keywords:
        movie_ids = contentsRepository.get_movie_ids_by_keyword(keyword)
        distinct_movie_ids.update(movie_ids)
    return list(distinct_movie_ids)