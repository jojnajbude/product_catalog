import {
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react';
import cn from 'classnames';
import { Phone } from '../../types/Phone';

import './ProductCard.scss';
import { Link } from 'react-router-dom';

type Props = {
  path: string;
  phone: Phone;
  updateUserData: () => void,
};

export const ProductCard: FC<Props> = ({ phone, updateUserData, path }) => {
  const {
    phoneId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = phone;
  const linkPath = useMemo(() => {
    return path === 'home'
      ? `/phones/${phoneId}`
      : `${phoneId}`
  }, [path])
  const imagePath = require(`../../images/${image}`);
  const [phoneCarts, setPhoneCarts] = useState<string[]>([]);
  const [favouritePhones, setFavouritePhones] = useState<string[]>([]);

  const phoneCartsStorage = () => {
    const phoneCartFromStorage = localStorage.getItem('phoneCarts');
    const dataInState = phoneCartFromStorage
      ? phoneCartFromStorage.split(',')
      : [];

    setPhoneCarts(dataInState);
    return dataInState;
  };

  const favouritePhonesStorage = () => {
    const favouritePhonesFromStorage = localStorage.getItem('favouritePhones');
    const dataInState = favouritePhonesFromStorage
      ? favouritePhonesFromStorage.split(',')
      : [];

    setFavouritePhones(dataInState);
    return dataInState;
  };

  const isPhoneCartsIncludeId = phoneCarts.includes(phoneId);
  const isFavouritePhonesIncludeId = favouritePhones.includes(phoneId);

  const handlePhoneCarts = () => {
    if (isPhoneCartsIncludeId) {
      const filteredPhoneCarts = phoneCartsStorage().filter(itemId => itemId !== phoneId);

      localStorage.setItem('phoneCarts', filteredPhoneCarts.join(','));
      setPhoneCarts(phoneCartsStorage());
    } else {
      const completePhoneCarts = [...phoneCartsStorage(), phoneId];

      localStorage.setItem('phoneCarts', completePhoneCarts.join(','));
      setPhoneCarts(phoneCartsStorage());
    }
  }
  const handleFavouritePhones = () => {
    if (isFavouritePhonesIncludeId) {
      const filteredFavouritePhones = favouritePhonesStorage().filter(itemId => itemId !== phoneId);

      localStorage.setItem('favouritePhones', filteredFavouritePhones.join(','));
      setFavouritePhones(favouritePhonesStorage());
    } else {
      const completeFavouritePhones = [...favouritePhonesStorage(), phoneId];

      localStorage.setItem('favouritePhones', completeFavouritePhones.join(','));
      setFavouritePhones(favouritePhonesStorage());
    }

    updateUserData();
  };

  useEffect(() => {
    phoneCartsStorage();
    favouritePhonesStorage();
  }, [])

  return (
    <div className="card">
      <div className="card__image-container">
        <Link to={linkPath}>
          <img
            className="card__image"
            src={imagePath}
            alt="phone"
          />
        </Link>
      </div>


      <Link to={linkPath} className="card__title">
        {name}
      </Link>

      <div className="card__price-container">
        <h2 className="card__current-price">
          {`$${price}`}
        </h2>

        <h2 className="card__full-price">
          {`$${fullPrice}`}
        </h2>
      </div>

      <hr className="card__line"/>

      <div className="card__info-container">
        <div className="card__info-raw">
          <span className="card__info-text">
            Screen
          </span>

          <span className="card__info-value">
            {screen}
          </span>
        </div>
        <div className="card__info-raw">
          <span className="card__info-text">
            Capacity
          </span>

          <span className="card__info-value">
            {capacity}
          </span>
        </div>
        <div className="card__info-raw">
          <span className="card__info-text">
            RAM
          </span>

          <span className="card__info-value">
            {ram}
          </span>
        </div>
      </div>

      <div className="card__buttons-container">
        <button
          className={cn('card__add-button', {
            'card__add-button--is-selected': isPhoneCartsIncludeId
          })}
          onClick={handlePhoneCarts}
        >
          {!isPhoneCartsIncludeId
            ? 'Add to card'
            : 'Added'}
        </button>

        <button
          className={cn('card__like-button', {
            'card__like-button--is-selected': isFavouritePhonesIncludeId
          })}
          onClick={handleFavouritePhones}
        />
      </div>
    </div>
  );
};
