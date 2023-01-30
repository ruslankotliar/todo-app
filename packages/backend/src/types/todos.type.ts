interface ITodo {
  id?: string;
  title: String;
  description: String;
  completed: Boolean;
  private: Boolean;
  createdAt: Date;
  userId: string;
}

type GetById = {
  id: string;
};

type CreateTodo = {
  title: String;
  description: String;
  private: Boolean;
};

type UpdateTodoBody = {
  title?: String;
  description?: String;
  completed?: boolean;
  private?: boolean;
};

type UpdateTodoParams = {
  id: string;
};

type DeleteTodoById = {
  id: string;
};

type Filters = {
  private?: Boolean;
  completed?: Boolean;
  $text?: { $search: string; $caseSensitive: Boolean; $diacriticSensitive: Boolean };
};

type Pagination = {
  $facet: {
    metadata: [{ $count: string }];
    data: [{ $skip: number }, { $limit: number }];
  };
};

export type {
  ITodo,
  GetById,
  CreateTodo,
  UpdateTodoBody,
  UpdateTodoParams,
  DeleteTodoById,
  Filters,
  Pagination
};
