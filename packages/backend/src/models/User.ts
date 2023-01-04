import { Schema, model, Model } from 'mongoose';
import { IUser } from '../types/user.type';

const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User: Model<IUser> = model('User', userSchema);

export default User;
