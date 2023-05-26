import { FC } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <div className="flex justify-between items-center">
      <Link to={`/`}>
        <h1 className="font-bold text-2xl">TypeDash</h1>
      </Link>
      <Link to={`login`}>
        <FiLogIn
          size={20}
          className="hover:text-lightgrey-8008 cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default Header;
