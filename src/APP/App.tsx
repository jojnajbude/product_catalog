import { FC } from 'react';
import {  Outlet } from 'react-router';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header/Header';

export const App: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
    );
}
