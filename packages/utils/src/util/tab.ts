export const getTabLabel = (tab: string): string => {
  switch (tab) {
    case 'all':
      return '전체';
    case 'interviewer':
      return '면접관';
    case 'applicant':
      return '지원자';
    case 'guide':
      return '안내자';
    case 'form':
      return '지원서 양식 설정';
    case 'stages':
      return '리크루팅 단계 구성';
    case 'docs':
      return '서류 평가 기준 설정';
    case 'interview':
      return '면접 평가 기준 설정';

    case 'documents':
      return '서류';
    case 'interviews':
      return '면접';
    case 'final':
      return '최종 합격';
    case 'rejected':
      return '불합격';

    case 'BEFORE':
      return '평가 전';
    case 'COMPLETED':
      return '평가 완료';
    default:
      return tab;
  }
};
