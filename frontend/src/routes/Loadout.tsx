import { SimpleGrid, Tooltip, useDisclosure } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import CreateLoadoutModal from '../components/loadouts/CreateLoadoutModal';
import DeleteLoadoutDialog from '../components/loadouts/DeleteLoadoutDialog';
import UpdateLoadoutModal from '../components/loadouts/UpdateLoadoutModal';
import { getLoadouts } from '../services/services';

interface LoadoutProps {
  user: string | undefined;
}

export interface Loadout {
  id: number;
  name: string;
  switches: string | undefined;
  others: string | undefined;
}

const Loadout: FC<LoadoutProps> = ({ user }) => {
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelDeleteRef = useRef<any>();
  const [loadouts, setLoadouts] = useState<Loadout[]>([]);
  const [maxLoadouts, setMaxLoadouts] = useState(false);
  const [loadoutToUpdate, setLoadoutToUpdate] = useState<Loadout>();
  const [loadoutToDeleteId, setLoadoutToDeleteId] = useState<number>();

  const getLoadoutHandler = () => {
    getLoadouts({ data: user }).then((res) => {
      const loadouts = res?.data.loadouts;
      // sort loadouts by id in ascending order
      loadouts.sort((a: Loadout, b: Loadout) => a.id - b.id);
      setLoadouts(loadouts);
      setMaxLoadouts(loadouts.length === 9);
    });
  };

  // const editloadoutHandler = (loadout: Loadout) => {
  //   navigate('/account/loadout/update', { state: loadout });
  // };

  const editModalHandler = (loadout: Loadout) => {
    onUpdateOpen();
    setLoadoutToUpdate(loadout);
  };

  const deleteAlertHandler = (loadout: Loadout) => {
    onDeleteOpen();
    setLoadoutToDeleteId(loadout.id);
  };

  useEffect(() => {
    if (user) getLoadoutHandler();
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
            onClick={onCreateOpen}
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
            <div className='font-semibold text-white'>{loadout.name}</div>
            <div>{loadout.switches}</div>
            <div>{loadout.others}</div>
            <div className='flex items-center justify-end gap-2'>
              <Tooltip
                label='Edit Loadout'
                aria-label='Edit loadout tooltip'
                className='font-mono'
              >
                <button
                  className='hover:brightness-150 transition'
                  onClick={() => editModalHandler(loadout)}
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
                  onClick={() => deleteAlertHandler(loadout)}
                >
                  <MdDeleteOutline size={20} />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </SimpleGrid>
      {/* <button className='hover:bg-slate-100 transition p-1'>
        <NavLink to='/account/loadout/create'>Create New Loadout</NavLink>
      </button> */}
      <UpdateLoadoutModal
        isUpdateOpen={isUpdateOpen}
        onUpdateClose={onUpdateClose}
        loadout={loadoutToUpdate!}
        getLoadoutHandler={getLoadoutHandler}
      />
      <CreateLoadoutModal
        isCreateOpen={isCreateOpen}
        onCreateClose={onCreateClose}
        user={user!}
        getLoadoutHandler={getLoadoutHandler}
      />
      <DeleteLoadoutDialog
        isDeleteOpen={isDeleteOpen}
        onDeleteClose={onDeleteClose}
        loadoutID={loadoutToDeleteId!}
        cancelDeleteRef={cancelDeleteRef}
        getLoadoutHandler={getLoadoutHandler}
      />
    </div>
  );
};

export default Loadout;
