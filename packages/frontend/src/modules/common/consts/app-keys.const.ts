import { Column } from '../interfaces';

// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN_STUDENT: 'JWT_TOKEN_STUDENT',
  JWT_TOKEN_INSTRUCTOR: 'JWT_TOKEN_INSTRUCTOR',
  ADDRESS: 'ADDRESS',
  TOKEN: 'TOKEN'
};

// React-query keys
export const QUERY_KEYS = {
  EXAMPLE: 'EXAMPLE',
  TOKEN: 'TOKEN',
  STATISTIC: 'statistic',
  TRENDING: 'trending'
};

// Backend Routes
export const BACKEND_KEYS = {
  TODOS: 'api/todos/',
  GET_TODO: 'api/todos/get-todo/',
  CREATE_TODO: 'api/todos/create-todo/',
  UPDATE_TODO: 'api/todos/update-todo/',
  DELETE_TODO: 'api/todos/delete-todo/'
};

export const ROUTER_KEYS = {
  ROOT: '/',
  TODO: '/todo/:id',
  UPDATE_TODO: '/todo/update-todo/:id',
  CREATE_TODO: '/todo/create-todo',
  NOT_FOUND: '*',
  PROFILE: '/profile/:id'
};

export const columns: Column[] = [
  { id: 'title', label: 'Title', minWidth: 100, align: 'left' },
  { id: 'description', label: 'Description', minWidth: 100, align: 'left' },
  { id: '_id', label: 'View', align: 'center' },
  { id: '_id', label: 'Edit', align: 'center' },
  { id: '_id', label: 'Delete', align: 'center' },
  {
    id: 'completed',
    label: 'Completed',
    minWidth: 170,
    align: 'center'
  }
];
