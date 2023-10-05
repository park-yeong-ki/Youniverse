from youniverse.repository import contentsRepository
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics.pairwise import euclidean_distances
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

    # 각 키워드별로 상위 10개 유사한 키워드 추출
    for i, keyword in enumerate(top_keywords):
        cnt = 0
        # 해당 키워드와의 유사도 값 가져오기
        keyword_similarity = top_keywords_similarity[i]
        # 내림차순 정렬하여 인덱스를 반환
        sorted_indices = np.argsort(keyword_similarity)[::-1][:10]  # 상위 10개 인덱스 추출
        # 유사도 상위 10개 키워드 출력
        for index in sorted_indices:
            similarity = keyword_similarity[index]
            if similarity != 0.0:
                cnt += 1
                similar_keyword = tmdb_keyword[index]
                similar_tmdb_keywords.append(similar_keyword)
                print(f"'{keyword}' <-> '{similar_keyword}': {similarity}")

        if cnt < 10:  # 남은 유사한 키워드가 10개 미만인 경우 유클리디안 거리 사용
            # 유클리디안 거리 계산
            euclidean_distances_matrix = euclidean_distances(tfidf_matrix)
            # 해당 키워드와의 거리 값 가져오기
            keyword_distances = euclidean_distances_matrix[i]
            # 오름차순 정렬하여 인덱스를 반환
            remaining = 10 - cnt
            sorted_indices = np.argsort(keyword_distances)  # 오름차순 정렬
            # 남은 유사도 상위 키워드 출력
            for index in sorted_indices:
                distance = keyword_distances[index]
                similar_keyword = tmdb_keyword[index]
                similarity = 1 / (1 + distance)  # 유클리디안 거리를 유사도로 변환
                similar_tmdb_keywords.append(similar_keyword)
                print(f"'{keyword}' <-> '{similar_keyword}': {similarity}")
                remaining -= 1
                if remaining == 0:
                    break  # 남은 개수만큼 출력

    return similar_tmdb_keywords



def get_movie_ids(result_keywords):
    distinct_movie_ids = set()
    for keyword in result_keywords:
        movie_ids = contentsRepository.get_movie_ids_by_keyword(keyword)
        distinct_movie_ids.update(movie_ids)
    return list(distinct_movie_ids)