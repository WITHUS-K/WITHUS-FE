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
  },
} as const;
