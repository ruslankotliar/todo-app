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
    default: false
  },
  userID: {
    type: String,
    minLength: 1,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Todo: Model<ITodo> = model('Todo', todoSchema);

todoSchema.index({ title: 'text', description: 'text' });

export default Todo;
