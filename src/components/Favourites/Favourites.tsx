import {FC, useEffect, useState} from 'react';
import { Path } from '../Path';
import { getFavouritesPhones, getPhones } from '../../api/phoneDescription';
import { Phone } from '../../types/Phone';
import { ProductCard } from '../ProductCard';
import { Loader } from '../../Loader';

export const Favourites: FC = () => {
  const [favouritesPhonesCount, setFavouritePhonesCount] = useState(0);
  const [phonesFromLocalStorage, setPhonesFromLocaleStorage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [phones, setPhones] = useState<Phone[]>([]);

  const getFavourite = async () => {
    setIsLoaded(true);

    try {
      const phonesFromApi = await getFavouritesPhones(phonesFromLocalStorage);

      setIsLoaded(false);
      setPhones(phonesFromApi);
    } catch (err: any) {
      setIsLoaded(false);
      throw new Error(err);
    }
  };

  const updateUserData = () => {
    const phonesIdsFromLocalStorage = localStorage.getItem('favouritePhones') || '';
    const favouritesPhonesId = phonesIdsFromLocalStorage
      ? phonesIdsFromLocalStorage.split(',')
      : [];
    const favouritesPhonesLength = favouritesPhonesId.length;

    if (phonesIdsFromLocalStorage) {
      setPhonesFromLocaleStorage(phonesIdsFromLocalStorage)
      setFavouritePhonesCount(favouritesPhonesLength)
    }
  }

  useEffect(() => {
    updateUserData();
    getFavourite();
  }, [phonesFromLocalStorage]);

  return (
    <>
      <Path />
      <div className="favourites">
        <div className="grid grid-mobile grid-tablet grid-desktop">
          <h1 className="favourites__title grid-mobile-1-5 grid-tablet-1-7 grid-desktop-1-7">
            Favourites
          </h1>

          {isLoaded
            ? <Loader />
            : (<>
                <div className="favourites__product-count grid-mobile-1-3 grid-tablet-1-3 grid-desktop-1-3">
                  {`${favouritesPhonesCount} items`}
                </div>

                <div className="
                  favourites__wrapper
                  grid-mobile-1-5
                  grid-tablet-1-13
                  grid-desktop-1-25"
                >
                  <div className="favourites__list">
                    {phones.map(phone => {
                      return (
                      <div className='favorites__product-item' key={phone.id} >
                        <ProductCard
                          phone={phone}
                          updateUserData={updateUserData}
                          path='favourites'
                        />
                      </div>);
                    })}
                  </div>
                </div>
              </>)}
        </div>
      </div>
    </>
  );
};
