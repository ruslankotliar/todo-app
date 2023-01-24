import { ILogInUser, IRegisterUser, IUpdateUser, UpdateUserParams } from '../types/user.type';
import UserService from '../services/user.service';
import { TypedRequestBody, TypedRequestParams } from '../types/controllers.type';
import { signJwt } from '../utils/jwt';

export class UserController {
  constructor(private userService: UserService) {}

  async logInUser(req: TypedRequestBody<ILogInUser>) {
    const { body: user } = req;
    const token = await signJwt(user._id);
    return { user: { email: user.email, id: user._id, avatar: user.avatar }, token };
  }

  async registerUser(req: TypedRequestBody<IRegisterUser>) {
    const { email, password, avatar } = req.body;
    const user = await this.userService.registerUser({
      email,
      password,
      avatar
    });
    const token = await signJwt(user._id);
    return { user: { email: user.email, id: user._id, avatar: user.avatar }, token };
  }

  async updateUser(req: TypedRequestParams<UpdateUserParams> & TypedRequestBody<IUpdateUser>) {
    const { body, params } = req;
    const user = await this.userService.updateUser(params.id, body);
    const token = await signJwt(user?._id);
    return { user: { email: user?.email, id: user?._id, avatar: user?.avatar }, token };
  }
}

const userController = new UserController(new UserService());

export default userController;
