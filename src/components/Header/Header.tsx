import React from 'react';
import {
  Link,
  NavLink,
} from 'react-router-dom';
import './Header.scss';

export const Header:React.FC = () => {
  const favoritesLength = 4;
  const itemsInCart = 8;

  return (
    <header className="header">
      <section className="header__left">
        <Link to="/">
          <img className="header__logo" src="./images/Logo.png" alt="logo" />
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
          to="/favorites"
          className="header__link"
        >
          <div className="header__link-wrap">
            <img
              src="./images/favorites.svg"
              className="header__link-img"
              alt="btn-like"
            />
            {favoritesLength > 0 && (
              <div className="header__link-img-count">
                {favoritesLength}
              </div>
            )}
          </div>
        </NavLink>

        <NavLink to="/cart" className="header__link">
          <div className="header__link-wrap">
            <img
              src="./images/cart.svg"
              className="header__link-img"
              alt="link-img"
            />
            {itemsInCart > 0 && (
              <div className="header__link-img-count">
                {itemsInCart}
              </div>
            )}
          </div>
        </NavLink>
      </section>
    </header>
  );
}