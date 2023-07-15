import { Divider, Fade, Spinner } from '@chakra-ui/react';
import { FC, useContext, useEffect, useState } from 'react';
import { authContext } from '../context/authContext';
import { getLoadouts } from '../services/services';
import Loadouts from './Loadouts';

interface AccountProps {}

export interface LoadoutProps {
  id: number;
  name: string;
  switches: string | undefined;
  others: string | undefined;
}
const Account: FC<AccountProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadouts, setLoadouts] = useState<LoadoutProps[]>([]);
  const context = useContext(authContext);
  const user = context?.user;

  const getLoadoutHandler = () => {
    setIsLoading(true);
    getLoadouts({ data: user }).then((res) => {
      const loadouts = res?.data.loadouts;
      // sort loadouts by id in ascending order
      loadouts.sort((a: LoadoutProps, b: LoadoutProps) => a.id - b.id);
      setLoadouts(loadouts);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (user) getLoadoutHandler();
  }, [user]);

  return isLoading ? (
    <div className='flex justify-center items-center'>
      <Spinner
        thickness='3px'
        speed='0.65s'
        emptyColor='gray.200'
        color='pink.500'
        size='lg'
      />
    </div>
  ) : (
    <Fade in={!isLoading} delay={0.3}>
      <div className='flex flex-col gap-4 h-full'>
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
        <Loadouts
          user={context?.user}
          loadouts={loadouts}
          getLoadoutHandler={getLoadoutHandler}
        />
      </div>
    </Fade>
  );
};

export default Account;
