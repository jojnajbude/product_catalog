import {
  FC,
  useEffect,
  useState,
  memo,
  useMemo,
} from 'react';
import cn from 'classnames';
import { Phone } from '../../types/Phone';

import './ProductCard.scss';
import { Link } from 'react-router-dom';

type Props = {
  phone: Phone;
};

export const ProductCard: FC<Props> = memo(({ phone }) => {
  const {
    itemId,
    phoneId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = phone;
  const imagePath = require(`../../images/${image.replace('.jpg', '.png')}`);

  const phoneCartsStorage = () => {
    const phoneCartFromStorage = localStorage.getItem('phoneCarts');

    return phoneCartFromStorage
      ? phoneCartFromStorage.split(',')
      : [];
  };
  const favouritePhonesStorage = () => {
    const favouritePhonesFromStorage =  localStorage.getItem('favouritePhones');

    return favouritePhonesFromStorage
      ? favouritePhonesFromStorage.split(',')
      : [];
  };

  const [phoneCarts, setPhoneCarts] = useState(phoneCartsStorage());
  const [favouritePhones, setFavouritePhones] = useState(favouritePhonesStorage());

  const isPhoneCartsIncludeId = phoneCarts.includes(itemId);
  const isFavouritePhonesIncludeId = favouritePhones.includes(itemId);

  const handlePhoneCarts = () => {
    if (isPhoneCartsIncludeId) {
      const filteredPhoneCarts = phoneCartsStorage().filter(id => id !== itemId);

      localStorage.setItem('phoneCarts', filteredPhoneCarts.join(','));
      setPhoneCarts(phoneCartsStorage());
    } else {
      const completePhoneCarts = [...phoneCartsStorage(), itemId];

      localStorage.setItem('phoneCarts', completePhoneCarts.join(','));
      setPhoneCarts(phoneCartsStorage());
    }
  }
  const handleFavouritePhones = () => {
    if (isFavouritePhonesIncludeId) {
      const filteredFavouritePhones = favouritePhonesStorage().filter(id => id !== itemId);

      localStorage.setItem('favouritePhones', filteredFavouritePhones.join(','));
      setFavouritePhones(favouritePhonesStorage());
    } else {
      const completeFavouritePhones = [...favouritePhonesStorage(), itemId];

      localStorage.setItem('favouritePhones', completeFavouritePhones.join(','));
      setFavouritePhones(favouritePhonesStorage());
    }
  };

  return (
    <div className="card">
      <div className="card__image-container">
        <Link to={`${phoneId}`}>
          <img
            className="card__image"
            src={imagePath}
            alt="phone"
          />
        </Link>
      </div>

      <Link to={`${phoneId}`} className="card__title">
        {phoneId}
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
});
