import { Tooltip } from '@chakra-ui/react';
import { FC, useContext } from 'react';
import { BsFillPersonFill, BsPeopleFill } from 'react-icons/bs';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
      <div className="flex items-center gap-8">
        <Link to={`/`}>
          <h1 className="font-bold text-2xl">TypeDash</h1>
        </Link>
        <div className="flex gap-6">
          <Tooltip
            label="Singleplayer"
            aria-label="Singleplayer tooltip"
            className="font-mono"
          >
            <Link to={`/singleplayer`}>
              <BsFillPersonFill
                size={25}
                className="hover:text-white transition"
              />
            </Link>
          </Tooltip>
          <Tooltip
            label="Multiplayer"
            aria-label="Multiplayer tooltip"
            className="font-mono"
          >
            <Link to={`/multiplayer`}>
              <BsPeopleFill size={25} className="hover:text-white transition" />
            </Link>
          </Tooltip>
        </div>
      </div>
      {!context?.user && (
        <Tooltip
          label="Log In"
          aria-label="Log in tooltip"
          className="font-mono"
        >
          <Link to={`login`}>
            <FiLogIn size={25} className="hover:text-white transition" />
          </Link>
        </Tooltip>
      )}
      {context?.user && (
        <div className="flex items-center gap-4">
          <h1>
            Welcome{' '}
            <NavLink to="/account/loadout" className="hover:underline">
              {context?.user}
            </NavLink>
          </h1>
          <Tooltip
            label="Log Out"
            aria-label="Log out tooltip"
            className="font-mono"
          >
            <button onClick={logoutHandler}>
              <FiLogOut size={25} className="hover:text-white transition" />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default Header;
