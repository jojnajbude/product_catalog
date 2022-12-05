import React, { useCallback, useEffect, useState } from 'react';
import {
  Link,
  NavLink,
} from 'react-router-dom';
import './Header.scss';
import Logo from '../../images/Logo.png';
import Cart from '../../images/cart.svg';
import Like from '../../images/like.svg';
import useLocalStorage from '../../utils/customHooks/useLocalStorage';

export const Header :React.FC = () => {
  const [favouritesPhonesCount, setFavouritePhonesCount] = useState(0);
  const [cartPhonesCount, setCartPhonesCount] = useState(0);
  const favouritePhones = useLocalStorage('favouritePhones');
  const phonesInCart = useLocalStorage('phoneCarts');

  const getInitialData = () => {
    const favouriteData = localStorage.getItem('favouritePhones');
    const favouritesPhonesId = favouriteData
      ? favouriteData.split(',')
      : [];
    const favouritesPhonesLength = favouritesPhonesId.length;

    const cartData = localStorage.getItem('phoneCarts');
    const cartPhonesId = cartData
      ? cartData.split(',')
      : [];
    const cartPhonesLength = cartPhonesId.length;

    if (favouriteData) {
      setFavouritePhonesCount(favouritesPhonesLength);
    }

    if (cartData) {
      setFavouritePhonesCount(cartPhonesLength);
    }
  }

  const updateUserData = useCallback(() => {
    const favouritesPhonesId = favouritePhones
      ? favouritePhones.split(',')
      : [];
    const favouritesPhonesLength = favouritesPhonesId.length;

    const cartPhonesId = phonesInCart
      ? phonesInCart.split(',')
      : [];
    const cartPhonesLength = cartPhonesId.length;

    if (favouritePhones) {
      setFavouritePhonesCount(favouritesPhonesLength);
    }

    if (cartPhonesLength) {
      setCartPhonesCount(cartPhonesLength)
    }
  }, [favouritePhones, phonesInCart]);

  useEffect( () => {
    getInitialData();
  }, [])

  useEffect(() => {
    updateUserData();
  }, [favouritePhones, phonesInCart]);

  return (
    <header className="header">
      <section className="header__left">
        <Link to="/">
          <img className="header__logo" src={ Logo } alt="logo" />
        </Link>

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <NavLink
                to="/"
                className="header__nav-link"
              >
                home
              </NavLink>
            </li>

            <li className="header__nav-item">
              <NavLink
                to="/phones"
                className="header__nav-link"
              >
                phones
              </NavLink>
            </li>

            <li className="header__nav-item">
              <NavLink
                to="/tablets"
                className="header__nav-link"
              >
                tablets
              </NavLink>
            </li>

            <li className="header__nav-item">
              <NavLink
                to="/accessory"
                className="header__nav-link"
              >
                accessory
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>

      <section className="header__right">
        <NavLink
          to="/favourites"
          className="header__link"
        >
          <div className="header__link-wrap">
            <img
              src={ Like }
              className="header__link-img"
              alt="btn-like"
            />
            {favouritesPhonesCount > 0 && (
              <div className="header__link-img-count">
                {favouritesPhonesCount}
              </div>
            )}
          </div>
        </NavLink>

        <NavLink to="/cart" className="header__link">
          <div className="header__link-wrap">
            <img
              src={ Cart }
              className="header__link-img"
              alt="link-img"
            />
            {cartPhonesCount > 0 && (
              <div className="header__link-img-count">
                {cartPhonesCount}
              </div>
            )}
          </div>
        </NavLink>
      </section>
    </header>
  );
}
