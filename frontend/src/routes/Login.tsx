import { useToast } from '@chakra-ui/react';
import { FormikValues, useFormik } from 'formik';
import { FC, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { authContext } from '../context/authContext';
import http from '../services/api';
interface LoginProps {}

export const Login: FC<LoginProps> = ({}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const context = useContext(authContext);

  const loginUserHandler = (values: FormikValues) => {
    http()
      .post('login', values)
      .then((res) => {
        console.log(res);
        context?.setUser(res.data.user.name);
        localStorage.setItem('token', res.data.token);
        toast({
          title: 'Login successful.',
          description: 'You are now logged in.',
          variant: 'subtle',
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
        navigate('/');
      })
      .catch((e) => {
        toast({
          title: 'Login failed.',
          description: `${e.response.data.message}.`,
          variant: 'subtle',
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Please enter your email'),
      password: Yup.string().required('Please enter your password'),
    }),
    onSubmit: loginUserHandler,
  });

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <form
        className="flex flex-col gap-2 w-1/2 text-left"
        onSubmit={formik.handleSubmit}
      >
        <div>login</div>
        <div className="flex flex-col gap-2">
          <input
            id="email"
            name="email"
            className={`bg-transparent border-solid border-2 rounded p-2 ${
              formik.touched.email && formik.errors.email
                ? 'border-red-600'
                : 'border-lightgrey-8008'
            }`}
            type="email"
            placeholder="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600 font-bold">{formik.errors.email}</div>
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            id="password"
            name="password"
            className={`bg-transparent border-solid border-2 rounded p-2 ${
              formik.touched.password && formik.errors.password
                ? 'border-red-600'
                : 'border-lightgrey-8008'
            }`}
            type="password"
            placeholder="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-600 font-bold">
              {formik.errors.password}
            </div>
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
        <button type="submit" className="hover:bg-slate-100 transition p-1">
          sign in
        </button>
      </form>
      <NavLink to="/register" className="hover:underline">
        don't have an account? sign up
      </NavLink>
    </div>
  );
};

export default Login;
