// queryKeys/createListKeys.ts
export const createListKeys = <T extends string>(resource: T) => {
  return {
    all: [resource] as const,
    lists: () => [resource, 'list'] as const,
    list: (filters?: unknown) => [resource, 'list', filters] as const,
    detail: (id: string) => [resource, 'detail', id] as const,
  };
};