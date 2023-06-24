import { FormikValues, useFormik } from 'formik';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import http from '../services/api';

interface RegisterProps {}

const Register: FC<RegisterProps> = ({}) => {
  const navigate = useNavigate();
  const registerUserHandler = (values: FormikValues) => {
    http()
      .post('register', values)
      .then(() => {
        navigate('/login');
      })
      .catch((e) =>
        alert(
          e.response.data.errors.reduce(
            (res: any, str: any) => res + '- ' + str.message + '\n',
            '',
            '',
          ),
        ),
      );
  };
  const textfieldStyleString =
    'bg-transparent border-solid border-2 border-lightgrey-8008 rounded p-2';

  const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character.`;
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      password2: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
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
    <div className="flex justify-center items-center gap-[16rem]">
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <h1>register</h1>
        <input
          id="username"
          name="username"
          className={textfieldStyleString}
          type="text"
          placeholder="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
        <input
          id="email"
          name="email"
          className={textfieldStyleString}
          type="email"
          placeholder="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <input
          id="password"
          name="password"
          className={textfieldStyleString}
          type="password"
          placeholder="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <input
          id="password2"
          name="password2"
          className={textfieldStyleString}
          type="password"
          placeholder="verify password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password2}
        />
        {formik.touched.password2 && formik.errors.password2 ? (
          <div>{formik.errors.password2}</div>
        ) : null}
        <button type="submit" className="hover:bg-slate-100 transition p-1">
          sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
