import { FC, useContext, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginUserProps } from '../components/authentication/auth.types';
import { authContext } from '../context/authContext';
import http from '../services/api';
interface LoginProps {}

export const Login: FC<LoginProps> = ({}) => {
  const navigate = useNavigate();
  const loginEmail = useRef<HTMLInputElement>(null);
  const loginPassword = useRef<HTMLInputElement>(null);
  const context = useContext(authContext);

  const textfieldStyleString =
    'bg-transparent border-solid border-2 border-lightgrey-8008 rounded p-2';

  const loginUserHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const params: LoginUserProps = {
      email: loginEmail.current!.value!,
      password: loginPassword.current!.value!,
    };
    http()
      .post('login', params)
      .then((res) => {
        console.log(res);
        context?.setUser(res.data.name);
        navigate('/');
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

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <form className="flex flex-col gap-4" onSubmit={loginUserHandler}>
        <h1>login</h1>
        <input
          className={textfieldStyleString}
          type="email"
          placeholder="email"
          ref={loginEmail}
        />
        <input
          className={textfieldStyleString}
          type="password"
          placeholder="password"
          ref={loginPassword}
        />
        <button type="submit" className="hover:bg-slate-100 transition p-1">
          log in
        </button>
      </form>
      <h1>
        don't have an account?{' '}
        <NavLink to="/register" className="hover:underline">
          sign up
        </NavLink>
      </h1>
    </div>
  );
};

export default Login;
