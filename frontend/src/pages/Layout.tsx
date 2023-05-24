import React, { FC } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen grid grid-cols-[2.5fr_6fr_2.5fr]">
      <div
        className="grid grid-rows-[auto_1fr_auto] col-start-2 col-end-2 bg-slate-300 p-8
      "
      >
        <nav className="bg-red-300">header</nav>
        {children}
        <footer className="bg-green-300">footer</footer>
      </div>
    </div>
  );
};
export default Layout;
