import User from '../models/User';
import { ICreateUser, IUser } from '../types/user.type';

export default class UserService {
  async findUser(email: string) {
    const user = await User.findOne({ email });
    return user;
  }

  async registerUser(body: ICreateUser) {
    const newUser = new User(body);
    const user = await newUser.save();
    return user;
  }

  async updateUser(id: string, body: ICreateUser) {
    const todo: IUser | null = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
    return todo;
  }
}
