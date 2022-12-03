import {FC, memo, useEffect, useState} from 'react';
import cn from 'classnames';
import { Path } from '../Path';
import { getPhones } from '../../api/phoneDescription';
import { Phone } from '../../types/Phone';
import { ProductCard } from '../ProductCard';

export const Favourites: FC = memo(() => {
  localStorage.setItem('favouritePhones', 'apple-iphone-11-64gb-black,apple-iphone-7-32gb-black,apple-iphone-11-128gb-black,apple-iphone-11-128gb-white');

  const phonesFromLocalStorage = localStorage.getItem('favouritePhones') || '';
  const favouritesPhonesId = phonesFromLocalStorage
    ? phonesFromLocalStorage.split(',')
    : [];
  const favouritesPhonesCount = favouritesPhonesId.length;
  const [phones, setPhones] = useState<Phone[]>([]);

  const getAllPhonesFromApi = async () => {
    try {
      const phones = await getPhones();

      return phones;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    (async () => setPhones(await getAllPhonesFromApi()))()
  }, []);

  const filteredPhones = phones.filter(phone => favouritesPhonesId.includes(phone.phoneId));

  return (
    <div className="favourites">
      <div>
        <Path />

        <div className="grid grid-mobile grid-tablet grid-desktop">
          <h1 className="favourites__title grid-mobile-1-5 grid-tablet-1-7 grid-desktop-1-7">
            Favourites
          </h1>

          <p className="favourites__product-count grid-mobile-1-3">
            {`${favouritesPhonesCount} items`}
          </p>
        </div>

        <ul className="favourites__list grid grid-mobile grid-tablet grid-desktop">
          {filteredPhones.map((phone, index) => {
            const columnNumber = (index + 4) % 4;

            return (
              <li key={phone.id} className={cn('grid-mobile-1-5', {
                'grid-tablet-1-7 grid-desktop-1-7': columnNumber === 0,
                'grid-tablet-7-13 grid-desktop-7-13': columnNumber === 1,
                'grid-tablet-1-7 grid-desktop-13-19': columnNumber === 2,
                'grid-tablet-7-13 grid-desktop-19-25': columnNumber === 3,
              })}
              >
                <ProductCard phone={phone} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
});
