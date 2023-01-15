export interface ITodo {
  _id: string;
  title: String;
  description: String;
  completed: Boolean;
  private: Boolean;
}

export interface ICreateTodo {
  title: String;
  description?: String;
  private?: Boolean;
  userID?: string;
}

export interface IUpdateTodo {
  title: String;
  description: String;
  private: Boolean;
  completed?: Boolean;
  userID?: string;
}

export interface IUpdateTodoMutation {
  todo: IUpdateTodo;
  id: string;
}
