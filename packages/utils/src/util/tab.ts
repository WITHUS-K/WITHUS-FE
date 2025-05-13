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
    case 'criteria':
      return '평가 기준 설정';

    case 'documents':
      return '서류';
    case 'interviews':
      return '면접';
    case 'final':
      return '최합';
    case 'rejected':
      return '불합격';
    default:
      return tab;
  }
};
