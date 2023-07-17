import { FormikValues, useFormik } from 'formik';
import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { registerUser } from '../services/services';

interface RegisterProps {}

const Register: FC<RegisterProps> = ({}) => {
  const navigate = useNavigate();
  const registerUserHandler = (values: FormikValues) => {
    registerUser(values).then(() => {
      navigate('/login');
    });
  };

  const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character.`;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password2: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(6, 'Username must be at least 6 characters')
        .max(15, 'Username must be 15 characters or less')
        .required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Please enter a password')
        .min(8, 'Password must have at least 8 characters')
        .matches(/[0-9]/, getCharacterValidationError('digit'))
        .matches(/[a-z]/, getCharacterValidationError('lowercase'))
        .matches(/[A-Z]/, getCharacterValidationError('uppercase')),
      password2: Yup.string()
        .required('Please re-type your password')
        .oneOf([Yup.ref('password')], 'Passwords does not match'),
    }),
    onSubmit: registerUserHandler,
  });
  return (
    <div className='flex flex-col justify-center items-center gap-6'>
      <form
        className='flex flex-col gap-2 w-1/2 text-left'
        onSubmit={formik.handleSubmit}
      >
        <h1>register</h1>
        <div className='flex flex-col gap-2'>
          <input
            id='name'
            name='name'
            className={`bg-transparent border-solid border-2 rounded p-2 ${
              formik.touched.name && formik.errors.name
                ? 'border-red-600'
                : 'border-lightgrey-8008'
            }`}
            type='text'
            placeholder='username'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className='text-red-600 font-bold'>{formik.errors.name}</div>
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <input
            id='email'
            name='email'
            className={`bg-transparent border-solid border-2 rounded p-2 ${
              formik.touched.email && formik.errors.email
                ? 'border-red-600'
                : 'border-lightgrey-8008'
            }`}
            type='email'
            placeholder='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className='text-red-600 font-bold'>{formik.errors.email}</div>
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <input
            id='password'
            name='password'
            className={`bg-transparent border-solid border-2 rounded p-2 ${
              formik.touched.password && formik.errors.password
                ? 'border-red-600'
                : 'border-lightgrey-8008'
            }`}
            type='password'
            placeholder='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='text-red-600 font-bold'>
              {formik.errors.password}
            </div>
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <input
            id='password2'
            name='password2'
            className={`bg-transparent border-solid border-2 rounded p-2 ${
              formik.touched.password2 && formik.errors.password2
                ? 'border-red-600'
                : 'border-lightgrey-8008'
            }`}
            type='password'
            placeholder='verify password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password2}
          />
          {formik.touched.password2 && formik.errors.password2 ? (
            <div className='text-red-600 font-bold'>
              {formik.errors.password2}
            </div>
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
        <button type='submit' className='hover:bg-slate-100 transition p-1'>
          sign up
        </button>
      </form>
      <NavLink to='/login' className='hover:underline'>
        back to login
      </NavLink>
    </div>
  );
};

export default Register;
