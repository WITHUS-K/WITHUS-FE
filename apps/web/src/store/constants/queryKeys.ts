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
    members: {
      // 전체 조직 사용자(멤버) 목록 조회 (페이징)
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
} as const;
