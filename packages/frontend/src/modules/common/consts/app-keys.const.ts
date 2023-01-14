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
  TODOS: 'todos/',
  GET_TODO: 'todos/get-todo/',
  CREATE_TODO: 'todos/create-todo',
  UPDATE_TODO: 'todos/update-todo/',
  DELETE_TODO: 'todos/delete-todo/',
  REGISTER_USER: 'user/register',
  LOGIN_USER: 'user/login',
  UPDATE_USER: 'user/update/'
};

export const ROUTER_KEYS = {
  ROOT: '/',
  SINGLE_TODO: '/todo/single-todo/:todoID',
  CREATE_TODO: '/todo/create-todo',
  UPDATE_TODO: '/todo/update-todo/:todoID',
  NOT_FOUND: '*',
  PROFILE: '/user/profile/:userID',
  LOGIN: '/user/login',
  SIGNUP: '/user/register',
  UPDATE: '/user/update/:userID'
};

export const REACT_QUERY_KEYS: { todo: string; todos: string; user: string } = {
  todo: 'todo',
  todos: 'todos',
  user: 'user'
};
