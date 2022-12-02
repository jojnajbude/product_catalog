import React from 'react';
import { Header } from '../components/Header/Header';
import { HomePage } from '../components/HomePage';
import { Footer } from '../components/footer';
import { Path } from '../components/Path';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}
