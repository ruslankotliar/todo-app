import { IUpdateUserMutation, IUser } from '../../interfaces';
import HttpService from './http.service';

import { BACKEND_KEYS } from '../../consts/app-keys.const';

class UserService extends HttpService {
  registerUser(user: IUser) {
    return this.post(
      {
        url: BACKEND_KEYS.REGISTER_USER,
        data: user
      },
      false
    );
  }

  loginUser(user: IUser) {
    return this.post({ url: BACKEND_KEYS.LOGIN_USER, data: user }, false);
  }

  updateUser({ user, id }: IUpdateUserMutation) {
    return this.put({
      url: `${BACKEND_KEYS.UPDATE_USER}${id}`,
      data: user
    });
  }
}

export const userService = new UserService();
