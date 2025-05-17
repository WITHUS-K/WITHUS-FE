export const queryKeys = {
  organization: {
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
    list: (keyword?: string) =>
      ['recruitments', keyword ?? ''] as const,
     slug: (slug: string) =>
        ['recruitments', 'slug', slug] as const,
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
  },
  timeSlot: {
    users: (timeSlotId: number) => ['timeSlot', 'users', timeSlotId] as const,
    applications: (timeSlotId: number) =>
      ['timeSlot', 'applications', timeSlotId] as const,
  },
} as const;
