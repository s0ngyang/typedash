import { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUserProps } from '../components/authentication/auth.types';
import http from '../services/api';

interface RegisterProps {}

const Register: FC<RegisterProps> = ({}) => {
  const navigate = useNavigate();
  const registerName = useRef<HTMLInputElement>(null);
  const registerEmail = useRef<HTMLInputElement>(null);
  const registerPassword = useRef<HTMLInputElement>(null);
  const registerVerifyPassword = useRef<HTMLInputElement>(null);
  const registerUserHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const params: RegisterUserProps = {
      name: registerName.current!.value!,
      email: registerEmail.current!.value!,
      password: registerPassword.current!.value!,
      password2: registerVerifyPassword.current!.value!,
    };
    console.log(params);
    http()
      .post('register', params)
      .then((res) => {
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
  return (
    <div className="flex justify-center items-center gap-[16rem]">
      <form className="flex flex-col gap-3" onSubmit={registerUserHandler}>
        <h1>register</h1>
        <input
          className={textfieldStyleString}
          type="text"
          placeholder="username"
          ref={registerName}
        />
        <input
          className={textfieldStyleString}
          type="email"
          placeholder="email"
          ref={registerEmail}
        />
        <input
          className={textfieldStyleString}
          type="password"
          placeholder="password"
          ref={registerPassword}
        />
        <input
          className={textfieldStyleString}
          type="password"
          placeholder="verify password"
          ref={registerVerifyPassword}
        />
        <button type="submit" className="hover:bg-slate-100 transition p-1">
          sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
