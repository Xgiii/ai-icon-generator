import React from 'react';
import MainHeader from './MainHeader';

function Layout({ children }: any) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
}

export default Layout;
