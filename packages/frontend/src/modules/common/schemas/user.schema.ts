import * as Yup from 'yup';

export const registerSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match')
});

export const loginSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password')
});

export const updateUserSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  oldPassword: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password'),
  newPassword: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password'),
  confirmNewPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('newPassword')], 'Password does not match')
});
