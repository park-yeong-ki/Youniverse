from youniverse.repository import usersRepository
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# 사용자 기반 콘텐츠 필터링 -> 사용자 기반 협업 필터링
# 사용자 필터링을 통한 결과 추출
def similarily(myKeywords, myEmail):
    # 모든 회원의 키워드 가져오기 (내 이메일 제외)
    member_keywords = usersRepository.get_member_keyword(myEmail)

    # 코사인 유사도 측정
    similarities = {}
    for email, keywords in member_keywords.items():
        vector1 = [1 if keyword in myKeywords else 0 for keyword in myKeywords]
        vector2 = [1 if keyword in keywords else 0 for keyword in myKeywords]
        similarity_score = cosine_similarity_score(vector1, vector2)
        similarities[email] = similarity_score

    # 유사성에 따라 회원 추천 (5명)
    recommended_members = sorted(similarities.items(), key=lambda x: x[1], reverse=True)[:5]

    return recommended_members

# 3. Cosine 유사성 계산
def cosine_similarity_score(vector1, vector2):
    vector1 = np.array(vector1).reshape(1, -1)
    vector2 = np.array(vector2).reshape(1, -1)
    return cosine_similarity(vector1, vector2)[0][0]