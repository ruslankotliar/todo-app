import { Schema, model, Model } from 'mongoose';
import { ITodo } from '../types/todos.type';

const todoSchema: Schema<ITodo> = new Schema({
  title: {
    type: String,
    maxLength: 50,
    required: true
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  private: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Todo: Model<ITodo> = model('Todo', todoSchema);

export default Todo;
