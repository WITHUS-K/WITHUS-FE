// src/store/organization/constants.ts
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
  },
} as const;
