import { ICreateUser, SignInUser } from '../types/user.type';
import UserService from '../services/user.service';
import { TypedRequestBody, TypedRequestParams } from '../types/controllers.type';
import { comparePasswords, hashPassword } from '../utils/password';
import { UpdateTodoParams } from '../types/todos.type';

export class UserController {
  constructor(private userService: UserService) {}

  async signInUser(req: TypedRequestParams<SignInUser>) {
    const { email, password } = req.body;
    const user = await this.userService.findUser(email);
    if (!user) throw new Error('User does not exist.');
    const validPassword = await comparePasswords(password, user?.password || '');
    if (!validPassword) throw new Error('Invalid password.');
    return user;
  }

  async registerUser(req: TypedRequestBody<ICreateUser>) {
    const { email, password, avatar } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = await this.userService.registerUser({
      email,
      password: hashedPassword,
      avatar
    });
    return newUser;
  }

  async changePassword(req: TypedRequestParams<UpdateTodoParams> & TypedRequestBody<ICreateUser>) {
    const { id } = req.params;
    const { body } = req;
    const updatedUser = await this.userService.updateUser(id, body);
    return updatedUser;
  }
}

const userController = new UserController(new UserService());

export default userController;
