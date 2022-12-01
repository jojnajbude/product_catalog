import classNames from 'classnames';
import React, { useState } from 'react';
import { Phone } from '../../types/Phone';
import { ProductCard } from '../ProductCard';
import './Carusel.scss';
import leftArrow from '../../images/arrow-left.svg';
import rightArrow from '../../images/arrow-right.svg';

type Props = {
  phones: () => Promise<Phone[]>;
  title: string;
};

export const Carusel: React.FC<Props> = ({ phones, title }) => {
  const [position, setPosition] = useState(0);

  const phonesArr: Phone[] = [];

  const lengthItems = phones.length;
  const step = 4;
  const frameSize = 4;
  const imgOff = lengthItems - step === position;

  const moveRight = () => {
    if ((position + step) < lengthItems) {
      setPosition(position + step);
    } else {
      setPosition(lengthItems - frameSize);
    }
  };

  const moveLeft = () => {
    if ((position - step) >= frameSize) {
      setPosition(position - step);
    } else {
      setPosition(0);
    }
  };

  return (
    <section className="Carusel">
      <div className="Carusel__wrap">
        <div className="Carusel__top">
          <h2 className="Carusel__title">{title}</h2>
          <div className="Carusel__btns">
            <button
              className="Carusel__btn"
              type="button"
              onClick={moveLeft}
              disabled={position === 0}
            >
              <img
                className={classNames(
                  { 'Carusel__img-off': position === 0 },
                )}
                src={leftArrow}
                alt="btn"
              />
            </button>
            <button
              className="Carusel__btn"
              type="button"
              onClick={moveRight}
              disabled={imgOff}
            >
              <img
                className={classNames(
                  { 'Carusel__img-off': imgOff },
                )}
                src={rightArrow}
                alt="btn"
              />
            </button>
          </div>
        </div>
        <ul
          className="Carusel__list"
          style={{
            marginLeft: `-${position * 288}px`,
            transition: '0.8s',
          }}
        >
          {phonesArr.map(phone => (
            <ProductCard 
              phoneId={phone.phoneId}
              name={phone.name}
              fullPrice={phone.fullPrice}
              price={phone.price}
              screen={phone.screen}
              capacity={phone.capacity}
              ram={phone.ram}
              image={phone.image}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};