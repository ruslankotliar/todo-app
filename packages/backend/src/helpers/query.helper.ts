import { Filters, Pagination } from '../types/todos.type';

const setFilters = (access: string, status: string, query: string): Filters => {
  let filters: Filters = { private: false };
  if (status === 'all') delete filters.completed;
  if (status === 'completed') filters.completed = true;
  if (status === 'todo') filters.completed = false;

  filters.private = access === 'private';

  if (query?.length) {
    filters = {
      ...filters,
      $text: { $search: query, $caseSensitive: false, $diacriticSensitive: false }
    };
  }

  return filters;
};

const setPagination = (perPage: number, page: number): Pagination => [
  { $setWindowFields: { output: { totalCount: { $count: {} } } } },
  { $skip: perPage * page },
  { $limit: perPage }
];

export const queryHelper = (params: any) => {
  const { access, status, query, perPage = 10, page = 0 } = params;

  const filters = setFilters(access, status, query);
  const pagination = setPagination(Number(perPage), Number(page));

  return { filters, pagination };
};
