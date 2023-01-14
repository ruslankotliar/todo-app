import * as Yup from 'yup';

export const todoSchema = Yup.object({
  title: Yup.string()
    .max(50, 'Title must be shorter than 50 characters ')
    .required('Title is required'),
  description: Yup.string().trim(),
  private: Yup.boolean()
});
