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

type ReturnUserData = {
  user: { email: string | undefined; id: string | undefined; avatar: string | undefined };
  token: string | undefined;
};

export type { IUser, ILogInUser, IRegisterUser, UpdateUserParams, IUpdateUser, ReturnUserData };
