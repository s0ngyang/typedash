import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { ThemeProps } from '../components/themes/theme.inteface';

interface LayoutProps {
  currentTheme: ThemeProps;
  setCurrentTheme: React.Dispatch<React.SetStateAction<ThemeProps>>;
}

export const Layout: FC<LayoutProps> = ({ currentTheme, setCurrentTheme }) => {
  return (
    <Box
      bg='bg.primary'
      color='text.primary'
      className='w-full h-screen grid grid-cols-[1fr_10fr_1fr] md:grid-cols-[1fr_6fr_1fr] xl:grid-cols-[2.5fr_6fr_2.5fr] font-mono'
    >
      <div
        className='grid grid-rows-[auto_1fr_auto] col-start-2 col-end-2 p-8
      '
      >
        <Header currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
        <Outlet />
        <Footer />
      </div>
    </Box>
  );
};
export default Layout;
