interface IUser {
  _id: string;
  email: string;
  password: string;
  avatar: string;
}

interface ICreateUser {
  email: string;
  password: string;
  avatar: string;
}

type LogInUserReqBody = {
  user: IUser;
};

export type { IUser, ICreateUser, LogInUserReqBody };
