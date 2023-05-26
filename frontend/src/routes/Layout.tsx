import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
  return (
    <div className="w-full h-screen grid grid-cols-[2.5fr_6fr_2.5fr] bg-grey-8008 text-lightgrey-8008 font-mono">
      <div
        className="grid grid-rows-[auto_1fr_auto] col-start-2 col-end-2 p-8
      "
      >
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};
export default Layout;
