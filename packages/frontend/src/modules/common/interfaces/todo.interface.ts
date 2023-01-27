export interface ITodo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  private: boolean;
  totalCount?: number;
}

export interface ICreateTodo {
  title: string;
  description?: string;
  private?: boolean;
  userID?: string;
}

export interface IUpdateTodo {
  title: string;
  description: string;
  private: boolean;
  completed?: boolean;
  userID?: string;
}

export interface IUpdateTodoMutation {
  todo: IUpdateTodo;
  id: string;
}
