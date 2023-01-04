interface IUser {
  _id: string;
  token?: string;
  email: string;
  password: string;
  avatar: string;
}

interface ICreateUser {
  email: string;
  password: string;
  avatar: string;
}

type SignInUser = {
  email: string;
};

export type { IUser, ICreateUser, SignInUser };
