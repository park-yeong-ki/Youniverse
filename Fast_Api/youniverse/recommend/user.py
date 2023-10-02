from youniverse.repository import usersRepository
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

# 사용자 기반 콘텐츠 필터링 -> 사용자 기반 협업 필터링(심화)
def similarily(top_keywords, myEmail):
    # 모든 회원의 키워드 가져오기 (내 이메일 제외)
    member_keywords = usersRepository.get_member_keyword(myEmail)

    # TF-IDF 벡터화 객체 생성
    tfidf_vectorizer = TfidfVectorizer()

    # 모든 키워드를 합친 리스트 생성
    all_keywords = top_keywords + [keyword for keywords in member_keywords.values() for keyword in keywords]

    # TF-IDF 벡터화 수행
    tfidf_matrix = tfidf_vectorizer.fit_transform(all_keywords)

    # 코사인 유사도 계산
    cosine_similarities = cosine_similarity(tfidf_matrix)

    # 결과를 저장할 배열
    similar_members = []

    # 모든 멤버에 대한 유사도 계산
    for member_id, keywords in member_keywords.items():
        # 각 멤버의 모든 키워드에 대한 평균 유사도 계산
        similarity_sum = 0.0
        for keyword in keywords:
            keyword_index = all_keywords.index(keyword)
            similarity_sum += cosine_similarities[:, keyword_index].mean()
        average_similarity = similarity_sum / len(keywords)
        similar_members.append((member_id, average_similarity))

    # 상위 키워드에 대한 멤버를 유사도에 따라 내림차순 정렬
    similar_members.sort(key=lambda x: x[1], reverse=True)

    return similar_members

# 3. Cosine 유사성 계산
def cosine_similarity_score(vector1, vector2):
    vector1 = np.array(vector1).reshape(1, -1)
    vector2 = np.array(vector2).reshape(1, -1)
    return cosine_similarity(vector1, vector2)[0][0]