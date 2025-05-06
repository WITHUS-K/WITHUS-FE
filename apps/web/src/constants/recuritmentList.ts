export type Applicant = {
    position: string;
    numOfApplicant: number;
};

export interface RecruitmentCardProps {
    /** D-day 카운트 (예: 17 → "D-17") */
    count: number;
    /** 모집 제목 */
    recruitTitle: string;
    /** 마감일 (문자열로 포맷해서 넘겨주세요) */
    dueDate: string;
    /** 링크 (URL 문자열) */
    recruitLink: string;
    /** 포지션별 지원자 정보 리스트 */
    currentApplicantList: Applicant[];
}
  

export const dummyApplicantList: Applicant[] = [
    { position: '기획', numOfApplicant: 18 },
    { position: '디자인', numOfApplicant: 23 },
    { position: '프론트', numOfApplicant: 27 },
    { position: '백엔드', numOfApplicant: 19 },
];

export const dummyRecruitmentCardList: RecruitmentCardProps[] = [
    {
        count: 17,
        recruitTitle: '[한국대학생IT경영학회] 큐시즘 32기 학회원 모집',
        dueDate: '2025.01.05(수)',
        recruitLink: 'http://www.kusitms.co.kr',
        currentApplicantList: dummyApplicantList,
      },
      {
        count: 8,
        recruitTitle: '[한국대학생IT경영학회] 큐시즘 32기 학회원 모집',
        dueDate: '2025.01.05(수)',
        recruitLink: 'http://www.kusitms.co.kr',
        currentApplicantList: dummyApplicantList,
      },
      {
        count: 0,
        recruitTitle: '[한국대학생IT경영학회] 큐시즘 32기 학회원 모집',
        dueDate: '2025.01.05(수)',
        recruitLink: 'http://www.kusitms.co.kr',
        currentApplicantList: dummyApplicantList,
      },
      {
        count: 0,
        recruitTitle: '[한국대학생IT경영학회] 큐시즘 32기 학회원 모집',
        dueDate: '2025.01.05(수)',
        recruitLink: 'http://www.kusitms.co.kr',
        currentApplicantList: dummyApplicantList,
      },
      {
        count: 17,
        recruitTitle: '[한국대학생IT경영학회] 큐시즘 32기 학회원 모집',
        dueDate: '2025.01.05(수)',
        recruitLink: 'http://www.kusitms.co.kr',
        currentApplicantList: dummyApplicantList,
      }
];