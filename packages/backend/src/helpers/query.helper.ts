import { Filters, Pagination } from '../types/todos.type';

const setFilters = (access: string, status: string, query: string): Filters => {
  let filters: Filters = { private: false };
  switch (status) {
    case 'all':
      delete filters.completed;
      break;
    case 'completed':
      filters.completed = true;
      break;
    case 'todo':
      filters.completed = false;
      break;
  }

  filters.private = access === 'private';

  if (query?.length) {
    filters = {
      ...filters,
      $text: { $search: query, $caseSensitive: false, $diacriticSensitive: false }
    };
  }

  return filters;
};

const setPagination = (perPage: number, page: number): Pagination => ({
  $facet: {
    metadata: [{ $count: 'total' }],
    data: [{ $skip: perPage * page }, { $limit: perPage }]
  }
});
export const queryHelper = (params: any) => {
  const { access, status, query, perPage = 10, page = 0 } = params;

  const filters = setFilters(access, status, query);
  const pagination = setPagination(Number(perPage), Number(page));

  return { filters, pagination };
};
