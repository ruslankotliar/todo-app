interface ITodo {
  id: string;
  title: String;
  description: String;
  completed: Boolean;
  private: Boolean;
  createdAt: Date;
}

type GetTodoById = {
  id: string;
};

type CreateTodo = {
  title: String;
  description: String;
  completed: Boolean;
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

export type { ITodo, GetTodoById, CreateTodo, UpdateTodoBody, UpdateTodoParams, DeleteTodoById };
