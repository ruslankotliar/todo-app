export interface ITodo {
  _id: any;
  title: String;
  description: String;
  completed: Boolean;
  private: Boolean;
}

export interface ICreateTodo {
  title: String;
  description?: String;
  private?: Boolean;
}

export interface IUpdateTodo {
  title: String;
  description: String;
  private: Boolean;
  completed?: Boolean;
}

export interface IUpdateTodoMutation {
  todo: IUpdateTodo;
  id: string;
}
