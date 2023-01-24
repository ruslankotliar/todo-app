interface IUser {
  _id: string;
  email: string;
  password: string;
  avatar: any;
}

interface IRequestUser {
  email: string;
  password: string;
  avatar: any;
}

interface ILogInUser extends IRequestUser {
  _id: string;
}

interface IRegisterUser extends IRequestUser {}

interface IUpdateUser extends IRequestUser {}

type UpdateUserParams = {
  id: string;
};

export type { IUser, ILogInUser, IRegisterUser, UpdateUserParams, IUpdateUser };
