import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface AccountProps {}

const Account: FC<AccountProps> = () => {
  return (
    <div className="flex flex-col">
      <NavLink to={'/account/loadout'} className="hover:underline">
        loadouts
      </NavLink>
    </div>
  );
};

export default Account;
