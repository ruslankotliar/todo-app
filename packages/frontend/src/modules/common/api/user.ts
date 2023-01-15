import { IUpdateUserMutation, IUser } from '../interfaces';
import { userService } from './services/user.service';

const registerUser = async (user: IUser) => {
  const { data } = await userService.registerUser(user);
  return data;
};

const loginUser = async (user: IUser) => {
  const { data } = await userService.loginUser(user);
  return data;
};

const updateUser = async ({ user, id }: IUpdateUserMutation) => {
  const { data } = await userService.updateUser({ user, id });
  return data;
};

export { registerUser, loginUser, updateUser };
