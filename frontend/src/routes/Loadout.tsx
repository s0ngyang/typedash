import { useToast } from '@chakra-ui/react';
import { FC, useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authContext } from '../context/authContext';
import http from '../services/api';

interface LoadoutProps {}

interface Loadout {
  id: Number;
  name: String;
  switches: String | undefined;
  others: String | undefined;
}

const Loadout: FC<LoadoutProps> = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const context = useContext(authContext);
  const [loadouts, setLoadouts] = useState<Loadout[]>([]);

  const getloadoutHandler = () => {
    http()
      .get('getloadout', { params: { data: context?.user } })
      .then((res) => {
        setLoadouts(res.data.loadouts);
      });
  };

  const deleteloadoutHandler = (id: Number) => {
    http()
      .delete('deleteloadout', { params: { data: id } })
      .then(() => {
        toast({
          title: 'Deleting loadout.',
          description: '...',
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
          <div className="flex flex-col justify-center gap-4 border">
            <p>{loadout.name}</p>
            <p>{loadout.switches}</p>
            <p>{loadout.others}</p>
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
          </div>
        ))}
      </div>
      <button className="hover:bg-slate-100 transition p-1">
        <NavLink to="/account/loadout/create">Create New Loadout</NavLink>
      </button>
    </div>
  );
};

export default Loadout;
