import { FC, useContext } from 'react';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/authContext';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    if (confirm('Are you sure you want to log out?')) {
      navigate('/login');
      context?.setUser(undefined);
    }
  };
  const context = useContext(authContext);
  return (
    <div className="flex justify-between items-center">
      <Link to={`/`}>
        <h1 className="font-bold text-2xl">TypeDash</h1>
      </Link>
      {!context?.user && (
        <Link to={`login`}>
          <FiLogIn
            size={20}
            className="hover:text-lightgrey-8008 cursor-pointer"
          />
        </Link>
      )}
      {context?.user && (
        <div className="flex items-center gap-4">
          <h1>Welcome {context?.user}</h1>
          <button onClick={logoutHandler}>
            <FiLogOut
              size={20}
              className="hover:text-lightgrey-8008 cursor-pointer"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
