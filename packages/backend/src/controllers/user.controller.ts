import {
  ILogInUser,
  IRegisterUser,
  IUpdateUser,
  ReturnUserData,
  UpdateUserParams
} from '../types/user.type';
import UserService from '../services/user.service';
import { TypedRequestBody, TypedRequestParams } from '../types/controllers.type';
import { signJwt } from '../utils/jwt';

export class UserController {
  constructor(private userService: UserService) {}

  async logInUser({ body: user }: TypedRequestBody<ILogInUser>): Promise<ReturnUserData> {
    const token = await signJwt(user._id);
    return { user: { email: user.email, id: user._id, avatar: user.avatar }, token };
  }

  async registerUser({ body }: TypedRequestBody<IRegisterUser>): Promise<ReturnUserData> {
    const { email, password, avatar } = body;
    const user = await this.userService.registerUser({
      email,
      password,
      avatar
    });
    const token = await signJwt(user._id);
    return { user: { email: user.email, id: user._id, avatar: user.avatar }, token };
  }

  async updateUser({
    body,
    params
  }: TypedRequestParams<UpdateUserParams> &
    TypedRequestBody<IUpdateUser>): Promise<ReturnUserData> {
    const user = await this.userService.updateUser(params.id, body);
    const token = await signJwt(user?._id);
    return { user: { email: user?.email, id: user?._id, avatar: user?.avatar }, token };
  }
}

const userController = new UserController(new UserService());

export default userController;
