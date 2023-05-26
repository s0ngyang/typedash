import { FC } from 'react';

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  return (
    <div className="flex justify-center items-center gap-[16rem]">
      <div className="flex flex-col gap-3">
        <h1>register</h1>
        <input
          className="bg-transparent border-solid border-2 border-lightgrey-8008 rounded p-2"
          type="text"
          placeholder="username"
        />
        <input
          className="bg-transparent border-solid border-2 border-lightgrey-8008 rounded p-2"
          type="email"
          placeholder="email"
        />
        <input
          className="bg-transparent border-solid border-2 border-lightgrey-8008 rounded p-2"
          type="email"
          placeholder="verify email"
        />
        <input
          className="bg-transparent border-solid border-2 border-lightgrey-8008 rounded p-2"
          type="password"
          placeholder="password"
        />
        <input
          className="bg-transparent border-solid border-2 border-lightgrey-8008 rounded p-2"
          type="password"
          placeholder="verify password"
        />
        <button>sign up</button>
      </div>
      <div className="flex flex-col gap-3">
        <h1>login</h1>
        <input
          className="bg-transparent border-solid border-2 border-lightgrey-8008 rounded p-2"
          type="email"
          placeholder="email"
        />
        <input
          className="bg-transparent border-solid border-2 border-lightgrey-8008 rounded p-2"
          type="password"
          placeholder="password"
        />
        <button>log in</button>
      </div>
    </div>
  );
};

export default Login;
