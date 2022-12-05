import React, { useState, useEffect, useMemo } from 'react';
import { getAllPhones } from '../../api/phoneDescription';
import { Filter } from '../../components/Filter';
import { Pagination } from '../../components/Pagination';
import { Path } from '../../components/Path';
import { ProductCard } from '../../components/ProductCard';
import { Loader } from '../../Loader';
import { Phone } from '../../types/Phone';
import { SortBy, sortByOptions } from '../../types/SortyBy';
import './Products.scss'

const perPageOptions = [16, 12, 8, 4];

export const Products: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [visiblePhones, setVisiblePhones] = useState<Phone[]>([])
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Newest);
  const [perPage, setPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false)

  const loadPhones = async () => {
    setIsLoaded(true);

    try {
      const phonesData = await getAllPhones();

      setPhones(phonesData);
      setIsLoaded(false);
      getVisiblePhones();
    } catch {
      setIsLoaded(false);
      throw new Error('something wrong');
    }
  };

  const getVisiblePhones = () => {
    const start = perPage * (currentPage - 1);
    const end = perPage * (currentPage);
    const realEnd = end > phones.length ? phones.length : end;

    const visiblePhones = [...phones].sort((phoneA, phoneB) => {
      switch (sortBy) {
        case SortBy.Newest:
          return phoneB.year - phoneA.year;

        case SortBy.Oldest:
          return phoneA.year - phoneB.year;

        case SortBy.Cheaper:
          return phoneB.price - phoneA.price;

        case SortBy.More_Expensive:
          return phoneA.price - phoneB.price;

        default:
          return 0;
      }
    }).slice(start, realEnd);

    setVisiblePhones(visiblePhones);
  }

  const handleQuantityChange = (quantity: string) => {
    setPerPage(+quantity);
    setCurrentPage(1);
  }

  const handleTypeSortChange = (type: string) => {
    setSortBy(type as SortBy);
    setCurrentPage(1);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollBy({ top: -100000, behavior: 'smooth' });
  }

  useEffect(() => {
    if (phones.length === 0) {
      loadPhones();
    }

    getVisiblePhones();
  }, [phones, sortBy, perPage, currentPage]);

  return (
    <>
      <Path />

      <div className="phones-page">
        <section className='phones-page__products products grid grid-mobile grid-tablet grid-desktop'>
          <h1 className='products__title grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25'>
            Mobile phones
          </h1>

          {isLoaded
            ? <Loader />
            : (
              <>
                <div className='products__length grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25'>
                  {`${phones.length} models`}
                </div>

                {phones.length && <div className='products__filters grid-mobile-1-5 grid-tablet-1-8 grid-desktop-1-8'>
                  <div className="products__filter products__filter--left">
                    <Filter
                      title='Sort by'
                      optionsList={sortByOptions}
                      selectedFilter={sortBy}
                      handleFilterChange={handleTypeSortChange}
                    />
                  </div>

                  <div className="products__filter products__filter--right">
                    <Filter
                      title='Items per page'
                      optionsList={perPageOptions}
                      selectedFilter={perPage}
                      handleFilterChange={handleQuantityChange}
                    />
                  </div>
                </div>}

                <div className="
                  products__cards-wrapper
                  grid-mobile-1-5
                  grid-tablet-1-13
                  grid-desktop-1-25"
                >
                  <div className="products__container">
                    {visiblePhones.map((phone) => {

                      return (
                        <div className={
                          `products__product-container`
                        }
                          key={phone.id}
                        >
                        <ProductCard
                          phone={phone}
                          updateUserData={() => {}}
                          path='phones'
                        />
                      </div>
                      )
                    })}
                  </div>

                  {phones.length && <div className='
                    products__pagination-container
                    grid-mobile-1-5
                    grid-tablet-1-13
                    grid-desktop-1-25'
                  >
                    <Pagination
                      total={phones.length}
                      perPage={perPage}
                      currentPage={currentPage}
                      handlePageChange={handlePageChange}
                    />
                  </div>}
                </div>
              </>)}
        </section>
      </div>
    </>
  );
};
