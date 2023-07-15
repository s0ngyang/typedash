import { Divider } from '@chakra-ui/react';
import { FC, useContext } from 'react';
import { authContext } from '../context/authContext';
import Loadout from './Loadout';

interface AccountProps {}

const Account: FC<AccountProps> = () => {
  const context = useContext(authContext);
  return (
    <div className='flex flex-col gap-4'>
      <div className='w-full h-1/5 brightness-90 bg-grey-8008 rounded-md flex justify-center items-center gap-24 px-4'>
        <div className='flex flex-col text-left'>
          <div className='font-semibold text-2xl text-white'>
            {context?.user}
          </div>
          <div className='text-xs'>Joined 12 Jul 2023</div>
        </div>
        <div className='h-4/5'>
          <Divider orientation='vertical' />
        </div>
        <div className='flex gap-12'>
          <div className='flex flex-col text-left'>
            <div className='text-sm'>tests started</div>
            <div className='text-2xl text-white font-semibold'>9999</div>
          </div>
          <div className='flex flex-col text-left'>
            <div className='text-sm'>tests completed</div>
            <div className='text-2xl text-white font-semibold'>9999</div>
          </div>
          <div className='flex flex-col text-left'>
            <div className='text-sm'>time typed</div>
            <div className='text-2xl text-white font-semibold'>9999</div>
          </div>
        </div>
      </div>
      <Loadout user={context?.user} />
    </div>
  );
};

export default Account;
