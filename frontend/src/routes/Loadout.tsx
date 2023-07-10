import { useToast } from '@chakra-ui/react';
import { FC, useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authContext } from '../context/authContext';
import http from '../services/api';

interface LoadoutProps {}

interface Loadout {
  id: number;
  name: string;
  switches: string | undefined;
  others: string | undefined;
}

const Loadout: FC<LoadoutProps> = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const context = useContext(authContext);
  const [loadouts, setLoadouts] = useState<Loadout[]>([]);

  const getloadoutHandler = () => {
    http()
      .get('/account/loadout', { params: { data: context?.user } })
      .then((res) => {
        setLoadouts(res.data.loadouts);
      })
      .catch(() => navigate('/'));
  };

  const deleteloadoutHandler = (id: number) => {
    http()
      .delete('/account/loadout/delete', { params: { data: id } })
      .then(() => {
        toast({
          title: 'Loadout deleted.',
          description: '',
          variant: 'subtle',
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
        getloadoutHandler();
      });
  };

  const editloadoutHandler = (loadout: Loadout) => {
    navigate('/account/loadout/update', { state: loadout });
  };

  useEffect(() => {
    getloadoutHandler();
  }, []);

  return (
    <div className="flex flex-col justify-center gap-4">
      <div>
        <strong>Your Loadouts</strong>
      </div>
      <div>
        {loadouts.map((loadout) => (
          <ul
            className="flex flex-col justify-center gap-4 border"
            key={loadout.id}
          >
            <li key={loadout.name}>{loadout.name}</li>
            <li key={loadout.switches}>{loadout.switches}</li>
            <li key={loadout.others}>{loadout.others}</li>
            <button
              className="hover:underline"
              onClick={() => editloadoutHandler(loadout)}
            >
              Edit
            </button>
            <button
              className="hover:underline"
              onClick={() => deleteloadoutHandler(loadout.id)}
            >
              Delete
            </button>
          </ul>
        ))}
      </div>
      <button className="hover:bg-slate-100 transition p-1">
        <NavLink to="/account/loadout/create">Create New Loadout</NavLink>
      </button>
    </div>
  );
};

export default Loadout;
