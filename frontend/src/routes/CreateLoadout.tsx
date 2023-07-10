import { useToast } from '@chakra-ui/react';
import { useContext, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authContext } from '../context/authContext';
import http from '../services/api';

const CreateLoadout = () => {
  const textfieldStyleString =
    'bg-transparent border-solid border-2 border-lightgrey-8008 rounded p-2';
  const loadoutName = useRef<HTMLInputElement>(null);
  const loadoutSwitches = useRef<HTMLInputElement>(null);
  const loadoutOthers = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const context = useContext(authContext);
  const toast = useToast();

  const submitLoadoutHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const params = {
      name: loadoutName.current!.value!,
      switches: loadoutSwitches.current!.value!,
      others: loadoutOthers.current!.value!,
      username: context?.user,
    };
    http()
      .post('account/loadout/create', params)
      .then(() => {
        toast({
          title: 'Loadout created.',
          description: '',
          variant: 'subtle',
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
        navigate('/account/loadout');
      })
      .catch(() => {
        navigate(0);
      });
  };

  return (
    <div className="flex flex-col justify-center gap-4">
      <form className="flex flex-col gap-3" onSubmit={submitLoadoutHandler}>
        <h1>loadout</h1>
        <input
          className={textfieldStyleString}
          type="text"
          placeholder="keyboard name"
          ref={loadoutName}
        />
        <input
          className={textfieldStyleString}
          type="text"
          placeholder="switches (optional)"
          ref={loadoutSwitches}
        />
        <input
          className={textfieldStyleString}
          type="text"
          placeholder="others - plate, pe foam... (optional)"
          ref={loadoutOthers}
        />
        <button type="submit" className="hover:bg-slate-100 transition p-1">
          create loadout
        </button>
      </form>
      <NavLink to="/account/loadout" className="hover:underline">
        back to loadouts
      </NavLink>
    </div>
  );
};

export default CreateLoadout;
