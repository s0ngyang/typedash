import { Tooltip } from '@chakra-ui/react';
import { FC, useContext } from 'react';
import { BsFillPersonFill, BsPeopleFill } from 'react-icons/bs';
import { CgSmile } from 'react-icons/cg';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { authContext } from '../context/authContext';
import useMediaQuery from '../helpers/useMediaquery';
// @ts-ignore:next-line
import { ReactComponent as CatLogo } from '../../src/assets/cat.svg';
import { logoutUser } from '../services/services';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const context = useContext(authContext);
  const logoutHandler = () => {
    logoutUser().then(() => {
      navigate('/');
      context?.setUser(undefined);
      localStorage.removeItem('token');
    });
  };
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-8'>
        <div className='flex items-center gap-4'>
          {!isMobile && (
            <CatLogo className='fill-pink-8008 stroke-black h-14 w-14' />
          )}
          <Link to={`/`}>
            <h1 className='font-bold text-lg md:text-2xl'>TypeDash</h1>
          </Link>
        </div>
        <div className='flex gap-6'>
          <Tooltip
            label='Singleplayer'
            aria-label='Singleplayer tooltip'
            className='font-mono'
          >
            <Link to={`/singleplayer`}>
              <BsFillPersonFill
                size={25}
                className='hover:text-white transition'
              />
            </Link>
          </Tooltip>
          <Tooltip
            label='Multiplayer'
            aria-label='Multiplayer tooltip'
            className='font-mono'
          >
            <Link to={`/multiplayer`}>
              <BsPeopleFill size={25} className='hover:text-white transition' />
            </Link>
          </Tooltip>
        </div>
      </div>
      {!context?.user && (
        <Tooltip
          label='Log In'
          aria-label='Log in tooltip'
          className='font-mono'
        >
          <Link to={`login`}>
            <FiLogIn size={25} className='hover:text-white transition' />
          </Link>
        </Tooltip>
      )}
      {context?.user && (
        <div className='flex items-center gap-4'>
          <NavLink
            to='/account'
            className='hover:underline flex items-center gap-2'
          >
            <CgSmile size={25} />
            <span>{context?.user}</span>
          </NavLink>
          <Tooltip
            label='Log Out'
            aria-label='Log out tooltip'
            className='font-mono'
          >
            <button onClick={logoutHandler}>
              <FiLogOut size={25} className='hover:text-white transition' />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default Header;
