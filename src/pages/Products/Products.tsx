import React, { useState, useEffect } from 'react';
import { getAllPhones } from '../../api/phoneDescription';
import { Path } from '../../components/Path';
import { Phone } from '../../types/Phone';

import './Products.scss'

type Props = {
  title: string;
};

// (async() => {
//   console.log(await getAllPhones());
// })();

export const Products: React.FC<Props> = ({ title }) => {
  const [phones, setPhones] = useState<Phone[]>([]);

  const loadPhones = async () => {
    try {
      const phonesData = await getAllPhones();

      setPhones(phonesData);
    } catch {
      throw new Error('something wrong')
    }
  };

  useEffect(() => {
    loadPhones();
  }, []);

  return (
    <section className='products'>
      <Path />
      <h1 className='products__title'>
        {title}
      </h1>

      {phones.map((phone) => (
        <div key={phone.id} className='products__div'>{phone.name}</div>
      ))}
    </section>
  );
};