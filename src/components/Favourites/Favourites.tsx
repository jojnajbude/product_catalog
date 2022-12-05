import {FC, useCallback, useEffect, useState} from 'react';
import { Path } from '../Path';
import { getFavouritesPhones, getPhones } from '../../api/phoneDescription';
import { Phone } from '../../types/Phone';
import { ProductCard } from '../ProductCard';
import { Loader } from '../Loader';
import useLocalStorage from '../../utils/customHooks/useLocalStorage';

export const Favourites: FC = () => {
  const [favouritesPhonesCount, setFavouritePhonesCount] = useState(0);
  const [phonesFromLocalStorage, setPhonesFromLocaleStorage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [phones, setPhones] = useState<Phone[]>([]);
  const phonesStorage = useLocalStorage('favouritePhones');

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
  const getInitialData = () => {
    const initialData = localStorage.getItem('favouritePhones');
    const favouritesPhonesId = initialData
      ? initialData.split(',')
      : [];
    const favouritesPhonesLength = favouritesPhonesId.length;

    if (initialData) {
      setPhonesFromLocaleStorage(initialData)
      setFavouritePhonesCount(favouritesPhonesLength)
    }
  }

  const updateUserData = useCallback(() => {
    const favouritesPhonesId = phonesStorage
      ? phonesStorage.split(',')
      : [];
    const favouritesPhonesLength = favouritesPhonesId.length;

    if (phonesStorage) {
      setPhonesFromLocaleStorage(phonesStorage)
      setFavouritePhonesCount(favouritesPhonesLength)
    }
  }, [phonesStorage]);

  useEffect( () => {
    getInitialData();
  }, [])

  useEffect(() => {
    updateUserData();
    getFavourite();
  }, [phonesStorage, phonesFromLocalStorage]);

  return (
      <div className="favourites">
        <Path />
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
                    {phones.map(phone => (
                      <div className='favorites__product-item' key={phone.id} >
                        <ProductCard
                          phone={phone}
                          path='favourites'
                        />
                      </div>)
                    )}
                  </div>
                </div>
              </>)}
        </div>
      </div>
  );
};
