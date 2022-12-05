import React from 'react';
import { NavLink } from 'react-router-dom';
import './Categories.scss';

import Phones from '../../images/Phones.png';
import Tablets from '../../images/Tablets.png';
import Accessories from '../../images/Accessories.png';

type Props = {
  phonesCount: number;
  tabletCount: number;
  accessoriesCount: number;
};

export const Categories: React.FC<Props> = ({
    phonesCount,
    tabletCount,
    accessoriesCount,
  },
) => {
  return (
    <section className="Categories grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25">
      <h2 className="Categories__title">Shop by category</h2>
      <ul className="Categories__list">

        <li className="Categories__item">
          <NavLink className="Categories__link" to="/phones">
            <div
              className="Categories__link-container
              Categories__link-container--1"
            >
              <img
                src={Phones}
                alt="category"
                className="Categories__img"
              />
            </div>

            <h4 className="Categories__subtitle">Mobile phones</h4>
          </NavLink>
          <span className="Categories__info">
            {`${phonesCount} models`}
          </span>
        </li>

        <li className="Categories__item">
          <NavLink className="Categories__link" to="/tablets">
            <div
              className="Categories__link-container
              Categories__link-container--2"
            >
              <img
                src={Tablets}
                alt="category"
                className="Categories__img"
              />
            </div>

            <h4 className="Categories__subtitle">Tablets</h4>
          </NavLink>
          <span className="Categories__info">
            {`${tabletCount} models`}
          </span>
        </li>

        <li className="Categories__item">
          <NavLink className="Categories__link" to="/accessory">
            <div
              className="Categories__link-container
              Categories__link-container--3"
            >
              <img
                src={Accessories}
                alt="category"
                className="Categories__img"
              />
            </div>

            <h4 className="Categories__subtitle">Accessories</h4>
          </NavLink>
          <span className="Categories__info">
            {`${accessoriesCount} models`}
          </span>
        </li>
      </ul>
    </section>
  );
};