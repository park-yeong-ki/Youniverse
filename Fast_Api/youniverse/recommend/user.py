from youniverse.repository import usersRepository
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

# 사용자 기반 협업 필터링
def similarily(member_id):
    # 내 키워드 가져오기
    top_keywords = usersRepository.get_keyword(member_id)
    # print("top_keywords: ", top_keywords)

    # 모든 회원의 키워드 가져오기 (내것 제외)
    member_keywords = usersRepository.get_member_keyword(member_id)
    # print("member_keywords: ", member_keywords)

    # TF-IDF 벡터화 객체 생성
    tfidf_vectorizer = TfidfVectorizer()

    # 모든 키워드를 합친 리스트 생성
    all_keywords = top_keywords + [keyword for keywords in member_keywords.values() for keyword in keywords]

    # TF-IDF 벡터화 수행
    tfidf_matrix = tfidf_vectorizer.fit_transform(all_keywords)

    # 코사인 유사도 계산
    cosine_similarities = cosine_similarity(tfidf_matrix)

    # 결과를 저장할 배열
    similar_members_result = []
    similar_members = []

    # 모든 멤버에 대한 유사도 계산
    for member_id, keywords in member_keywords.items():
        # 각 멤버의 모든 키워드에 대한 평균 유사도 계산
        similarity_sum = 0.0
        for keyword in keywords:
            keyword_index = all_keywords.index(keyword)
            similarity_sum += cosine_similarities[:, keyword_index].mean()
        average_similarity = similarity_sum / len(keywords)
        similar_members_result.append((member_id, average_similarity))

    # 상위 키워드에 대한 멤버를 유사도에 따라 내림차순 정렬
    similar_members_result.sort(key=lambda x: x[1], reverse=True)

    print("사용자 필터링을 통한 결과:")
    for member_id, similarity_score in similar_members_result:
        similarity_score_int = int(round(similarity_score * 1000))
        similar_members.append((member_id, similarity_score_int))
        print(f"{member_id} (유사도: {similarity_score_int})")

    return similar_members[:5]

# 사용자 정보 가져오기
def get_members_info(users):
    return usersRepository.get_members_info(users)

