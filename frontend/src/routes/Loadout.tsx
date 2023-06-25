import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface LoadoutProps {}

const Loadout: FC<LoadoutProps> = () => {
  return (
    <div className="flex flex-col">
      <div>your loadouts</div>
      <div>*loadouts display*</div>
      <NavLink to="/account/loadout/create" className="hover:underline">
        create new loadout
      </NavLink>
    </div>
  );
};

export default Loadout;
