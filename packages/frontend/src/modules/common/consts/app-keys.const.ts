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

export const REACT_QUERY_KEYS: { todo: string; todos: string } = {
  todo: 'todo',
  todos: 'todos'
};
