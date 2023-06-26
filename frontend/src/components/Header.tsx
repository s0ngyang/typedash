import { Tooltip, useToast } from '@chakra-ui/react';
import { FC, useContext } from 'react';
import { BsFillPersonFill, BsPeopleFill } from 'react-icons/bs';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { authContext } from '../context/authContext';
import http from '../services/api';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const logoutHandler = () => {
    http()
      .post('logout')
      .then(() => {
        toast({
          title: 'Logout successful.',
          description: 'You are now logged out.',
          variant: 'subtle',
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
        navigate('/');
        context?.setUser(undefined);
      })
      .catch((e) => {
        toast({
          title: 'Logout failed.',
          description: `${e.response.data.message}.`,
          variant: 'subtle',
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      });
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
