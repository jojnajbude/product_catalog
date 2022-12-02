import React from 'react';
import { Header } from '../components/Header/Header';
import { HomePage } from '../components/HomePage';
import { Footer } from '../components/Footer';
import { Path } from '../components/Path';
// import { getPhones } from '../api/phoneDescription';

export const App = () => {
  // const arr = async () => {
  //   try {
  //     const phones = await getPhones();
  //
  //     console.log(phones)
  //   } catch (err: any) {
  //     throw new Error(err);
  //   }
  // };

  return (
    <div className="app">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}
