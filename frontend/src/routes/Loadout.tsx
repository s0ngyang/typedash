import { FC, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { authContext } from '../context/authContext';
import http from '../services/api';

interface LoadoutProps {}

interface Loadout {
  name: String;
  switches: String | undefined;
  others: String | undefined;
}

const Loadout: FC<LoadoutProps> = () => {
  const context = useContext(authContext);
  const [loadouts, setLoadouts] = useState<Loadout[]>([]);

  useEffect(() => {
    http()
      .post('getloadout', { name: context?.user })
      .then((res) => {
        setLoadouts(res.data.loadouts);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center gap-4">
      <div>Your Loadouts</div>
      <div>
        {loadouts.map((loadout) => (
          <>
            <p>{loadout.name}</p>
            <p>{loadout.switches}</p>
            <p>{loadout.others}</p>
          </>
        ))}
      </div>
      <button className="hover:bg-slate-100 transition p-1">
        <NavLink to="/account/loadout/create">Create New Loadout</NavLink>
      </button>
    </div>
  );
};

export default Loadout;
