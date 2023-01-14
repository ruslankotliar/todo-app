export interface IUser {
  id?: string;
  email: string;
  password: string;
}

export interface IStorageUser {
  email: string | undefined;
  id: string | undefined;
}

interface IUpdateUser extends IUser {
  newPassword: string;
}

export interface IUpdateUserMutation {
  user: IUpdateUser;
  id: string;
}

export interface ICreateUser {
  user: IStorageUser;
  token: string;
}

export interface IFormRegisterUser extends IUser {
  confirmPassword: string;
}

export interface IFormLoginUser extends IUser {}

export interface IFormUpdateUser extends IUser {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
