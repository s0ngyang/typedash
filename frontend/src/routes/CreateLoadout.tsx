import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const submitLoadoutHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const params = {
      name: loadoutName.current!.value!,
      switches: loadoutSwitches.current!.value!,
      others: loadoutOthers.current!.value!,
      username: context?.user,
    };
    console.log(params);
    http()
      .post('createloadout', params)
      .then(() => {
        navigate('/account/loadout');
      })
      .catch((err) =>
        alert(
          err.response.data.errors.reduce(
            (res: any, str: any) => res + '- ' + str.message + '\n',
            '',
            '',
          ),
        ),
      );
  };

  return (
    <div className="flex flex-col">
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
    </div>
  );
};

export default CreateLoadout;
