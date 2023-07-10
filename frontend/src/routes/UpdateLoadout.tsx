import { useToast } from '@chakra-ui/react';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import http from '../services/api';

const CreateLoadout = () => {
  const textfieldStyleString =
    'bg-transparent border-solid border-2 border-lightgrey-8008 rounded p-2';
  const { state } = useLocation();
  const loadoutName = useRef<HTMLInputElement>(null);
  const loadoutSwitches = useRef<HTMLInputElement>(null);
  const loadoutOthers = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const toast = useToast();

  const submitLoadoutHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const params = {
      name: loadoutName.current!.value!,
      switches: loadoutSwitches.current!.value!,
      others: loadoutOthers.current!.value!,
      id: state.id,
    };
    http()
      .put('account/loadout/update', params)
      .then(() => {
        toast({
          title: 'Loadout updated.',
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
        toast({
          title: 'Session expired.',
          description: 'Please login again',
          variant: 'subtle',
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
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
          defaultValue={state.name}
          ref={loadoutName}
        />
        <input
          className={textfieldStyleString}
          type="text"
          placeholder="switches (optional)"
          defaultValue={state.switches}
          ref={loadoutSwitches}
        />
        <input
          className={textfieldStyleString}
          type="text"
          placeholder="others - plate, pe foam... (optional)"
          defaultValue={state.others}
          ref={loadoutOthers}
        />
        <button type="submit" className="hover:bg-slate-100 transition p-1">
          update loadout
        </button>
      </form>
    </div>
  );
};

export default CreateLoadout;
