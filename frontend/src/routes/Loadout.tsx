import { SimpleGrid, Tooltip, useToast } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import http from '../services/api';

interface LoadoutProps {
  user: string;
}

interface Loadout {
  id: number;
  name: string;
  switches: string | undefined;
  others: string | undefined;
}

const Loadout: FC<LoadoutProps> = ({ user }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loadouts, setLoadouts] = useState<Loadout[]>([]);
  const [maxLoadouts, setMaxLoadouts] = useState(false);

  const getloadoutHandler = () => {
    http()
      .get('account/loadout', { params: { data: user } })
      .then((res) => {
        const loadouts = res.data.loadouts;
        // sort loadouts by id in ascending order
        loadouts.sort((a: Loadout, b: Loadout) => a.id - b.id);
        setLoadouts(loadouts);
        setMaxLoadouts(loadouts.length === 9);
      });
  };

  const deleteloadoutHandler = (id: number) => {
    http()
      .delete('account/loadout/delete', { params: { data: id } })
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
    if (user) getloadoutHandler();
  }, [user]);

  return (
    <div className='flex flex-col gap-2'>
      <div className='text-left font-semibold flex justify-between'>
        <div>keyboard loadouts</div>
        <Tooltip
          label='You can only have up to 9 loadouts!'
          aria-label='Maximum loadout alert tooltip'
          className='font-mono'
          isDisabled={!maxLoadouts}
        >
          <button
            disabled={maxLoadouts}
            className='bg-pink-8008 text-grey-8008 px-4 py-1 rounded-md disabled:opacity-30'
          >
            Create Loadout
          </button>
        </Tooltip>
      </div>
      <SimpleGrid columns={3} spacing={5}>
        {loadouts.map((loadout) => (
          <div
            className='flex flex-col justify-center bg-grey-8008 brightness-90 rounded-md p-4 text-left'
            key={loadout.id}
          >
            <div className='font-semibold text-white' key={loadout.name}>
              {loadout.name}
            </div>
            <div key={loadout.switches}>{loadout.switches}</div>
            <div key={loadout.others}>{loadout.others}</div>
            <div className='flex items-center justify-end gap-2'>
              <Tooltip
                label='Edit Loadout'
                aria-label='Edit loadout tooltip'
                className='font-mono'
              >
                <button
                  className='hover:brightness-150 transition'
                  onClick={() => editloadoutHandler(loadout)}
                >
                  <FiEdit size={17} />
                </button>
              </Tooltip>
              <Tooltip
                label='Delete Loadout'
                aria-label='Delete loadout tooltip'
                className='font-mono'
              >
                <button
                  className='hover:brightness-150 transition'
                  onClick={() => deleteloadoutHandler(loadout.id)}
                >
                  <MdDeleteOutline size={20} />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </SimpleGrid>
      <button className='hover:bg-slate-100 transition p-1'>
        <NavLink to='/account/loadout/create'>Create New Loadout</NavLink>
      </button>
    </div>
  );
};

export default Loadout;
