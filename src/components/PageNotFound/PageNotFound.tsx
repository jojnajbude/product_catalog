import React from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';

export const PageNotFound: React.FC = () => {
  return (
    <div className='page-not-found'>
      <Header />
      <h1 className="page-not-found__title">Page not found</h1>
      <Footer />
    </div>

  );
};
