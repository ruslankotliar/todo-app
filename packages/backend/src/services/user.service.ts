import User from '../models/User';
import { IRegisterUser, IUpdateUser, IUser } from '../types/user.type';

export default class UserService {
  async registerUser(body: IRegisterUser) {
    const newUser = new User(body);
    const user = await newUser.save();
    return user;
  }

  async updateUser(id: string, body: IUpdateUser) {
    const todo: IUser | null = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
    return todo;
  }
}
