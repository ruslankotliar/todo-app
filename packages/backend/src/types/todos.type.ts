// TODO: Put a real interfaces here

export interface IUser {
  data: string;
}

export interface ITodo {
  title: String;
  description: String;
  completed: Boolean;
  private: Boolean;
  createdAt: Date;
}
