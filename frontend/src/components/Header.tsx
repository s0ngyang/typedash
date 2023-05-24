import { FC } from 'react';
import { FiLogIn } from 'react-icons/fi';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="font-bold text-2xl">TypeDash</h1>
      <FiLogIn size={20} />
    </div>
  );
};

export default Header;
