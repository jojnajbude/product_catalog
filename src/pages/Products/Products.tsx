import React, { useState, useEffect, useMemo } from 'react';
import { getAllPhones } from '../../api/phoneDescription';
import { Filter } from '../../components/Filter';
import { Pagination } from '../../components/Pagination';
import { Path } from '../../components/Path';
import { ProductCard } from '../../components/ProductCard';
import { Phone } from '../../types/Phone';
import { SortBy, sortByOptions } from '../../types/SortyBy';

import './Products.scss'

type Props = {
  title: string;
};


export const Products: React.FC<Props> = ({ title }) => {
  const [phones, setPhones] = useState<Phone[]>([]);

  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Newest);

  const perPageOptions = [16, 12, 8];
  const [perPage, setPerPage] = useState(perPageOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const loadPhones = async () => {
    try {
      const phonesData = await getAllPhones();
      console.log('before');
      setPhones(phonesData);
      console.log('after');
    } catch {
      throw new Error('something wrong')
    }
  };

  useEffect(() => {
    loadPhones();
    console.log('products rendered');
  }, []);

  const phoneLength = phones.length;

  console.log('length', phoneLength);

  return (
   <div className="container">
     <section className='products'>
      <Path />
        <h1 className='products__title'>
          {title}
        </h1>
        <div className='products__length'>
          {`${phones.length} models`}
        </div>

        <div className='products__filters grid grid-desktop'>
          <div className="
            products__filter
            grid-desktop-1-5"
          >
            <Filter 
              title='Sort by'
              optionsList={sortByOptions}
              selectedFilter={sortBy}
              setFilter={setSortBy}
            />
          </div>

          <div className="
            products__filter
            grid-desktop-5-8"
          >
            <Filter 
              title='Items per page'
              optionsList={perPageOptions}
              selectedFilter={perPage}
              setFilter={setPerPage}
            />
          </div>
        </div>

        <div className="products__container grid grid-desktop">
          {phones.map((phone, i) => {
            const end = 24 - (24 - ((Math.ceil(i % 4) + 1) * 6)) + 1;
            const start = end - 6;

            return (
              <div className={
                `products__product-container grid-desktop-${start}-${end}`
              }
              key={phone.id}
              >
                <ProductCard 
                  phone={phone}
                />
              </div>
            )
          })}

          <div className='products__pagination-container grid-desktop-10-16'>
            <Pagination
              total={phones.length} // here should be phones.length, but if write this will be error
              perPage={perPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
    </section>
   </div>
  );
};