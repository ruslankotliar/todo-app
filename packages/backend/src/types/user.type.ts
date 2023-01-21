interface IUser {
  _id: string;
  email: string;
  password: string;
  avatar: any;
}

interface ICreateUser {
  email: string;
  password: string;
  avatar: any;
}

type LogInUserReqBody = {
  user: IUser;
};

export type { IUser, ICreateUser, LogInUserReqBody };
