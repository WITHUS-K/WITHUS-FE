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
    default:
      return tab;
  }
};
