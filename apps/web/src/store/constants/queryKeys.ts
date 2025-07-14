export const queryKeys = {
  organization: {
    me: () => ['organization', 'me'] as const,

    roles: {
      list: (organizationId: number, keyword?: string) =>
        keyword
          ? ([
              'organization',
              organizationId,
              'roles',
              'search',
              keyword,
            ] as const)
          : (['organization', organizationId, 'roles'] as const),
    },
    users: {
      search: (organizationId: number, roleId: number, keyword?: string) =>
        keyword
          ? ([
              'organization',
              organizationId,
              'users',
              'search',
              roleId,
              keyword,
            ] as const)
          : ([
              'organization',
              organizationId,
              'users',
              'search',
              roleId,
            ] as const),
    },
    members: {
      list: (organizationId: number, page: number, size: number) =>
        [
          'organization',
          organizationId,
          'members',
          'list',
          page,
          size,
        ] as const,
    },
  },
  recruitments: {
    list: (keyword?: string) => ['recruitments', keyword ?? ''] as const,
    slug: (slug: string) => ['recruitments', 'slug', slug] as const,
    listByOrganization: (organizationId: number) =>
      ['recruitments', 'organization', organizationId] as const,
  },
  recruitment: {
    list: () => ['recruitment', 'list'] as const,
    detail: (id: number) => ['recruitment', 'detail', id] as const,
  },
  interview: {
    orgList: () => ['interview', 'organization', 'list'] as const,
    myTimeSlots: (id: number) => ['interview', 'my-time-slots', id] as const,
    schedule: (id: number) => ['interview', 'schedule', id] as const,
    create: () => ['interview', 'create'] as const,
    scheduleCreate: () => ['interview', 'schedule', 'create'] as const,
    config: (interviewId: number) =>
      ['interview', 'config', interviewId] as const,
  },
  timeSlot: {
    users: (timeSlotId: number) => ['timeSlot', 'users', timeSlotId] as const,
    applications: (timeSlotId: number) =>
      ['timeSlot', 'applications', timeSlotId] as const,
  },
  positions: {
    byRecruitment: (recruitmentId: number) =>
      ['positions', 'byRecruitment', recruitmentId] as const,
  },

  applications: {
    userList: (
      recruitmentId: number,
      evaluationStatus: string,
      keyword: string,
      page: number,
      size: number
    ) =>
      [
        'applications',
        'recruitment',
        recruitmentId,
        'list',
        evaluationStatus,
        keyword,
        page,
        size,
      ] as const,

    list: (
      recruitmentId: number,
      stage: string,
      sortBy: string,
      direction: string,
      page: number,
      size: number
    ) =>
      [
        'admin',
        'applications',
        'recruitment',
        recruitmentId,
        'list',
        stage,
        sortBy,
        direction,
        page,
        size,
      ] as const,

    detail: (applicationId: number) =>
      ['applications', 'detail', applicationId] as const,

    bulkSms: () => ['admin', 'applications', 'bulk-sms'] as const,
    bulkMail: () => ['admin', 'applications', 'bulk-mail'] as const,
  },
  distribution: {
    latest: (recruitmentId: number) =>
      ['distribution', 'latest', recruitmentId] as const,
    submit: (recruitmentId: number) =>
      ['distribution', 'submit', recruitmentId] as const,
  },
  templates: {
    list: (medium: 'SMS' | 'MAIL') => ['templates', 'list', medium] as const,
    detail: (templateId: number) =>
      ['templates', 'detail', templateId] as const,
  },

  user: {
    myPage: () => ['user', 'myPage'] as const,
  },
} as const;
