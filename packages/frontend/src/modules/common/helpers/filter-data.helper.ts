import { ITodo } from '../interfaces';

// SEARCH BAR (currently not used)
export const filterData = (query: string, data: ITodo[]): ITodo[] => {
  if (!query) {
    return data;
  }
  return data.filter((d) => d.title.toLowerCase().includes(query));
};
