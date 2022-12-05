import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { Phone } from '../../types/Phone';
import { ProductCard } from '../ProductCard';
import './Carusel.scss';
import leftArrow from '../../images/arrow-left.svg';
import rightArrow from '../../images/arrow-right.svg';
import useWindowDimensions from '../../utils/customHooks/useWindowDimensions';
import { getArrangedPhones } from '../../api/phoneDescription';
import { Loader } from '../../Loader';

type Props = {
  title: string;
  orderType: string;
  path: string;
};

export const Carusel: React.FC<Props> = ({ orderType, title, path }) => {
  const [position, setPosition] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [phones, setPhones] = useState<Phone[] | null>(null)

  const carouselSlides = useMemo(() => phones ? phones.length : 0, [phones]);
  const { width } = useWindowDimensions();
  const frameSize = useMemo(() => {
    switch (true) {
      case (width >= 320 && width < 640):
        return 304;

      case (width >= 640 && width < 978):
        return 588;

      case (width >= 978 && width < 1200):
        return 882;

      case (width >= 1200):
        return 1152;

      default:
        return 304;
    }
  }, [width, phones]);

  const step = useMemo(() => {
    switch (true) {
      case (width >= 320 && width < 640):
        return 1;

      case (width >= 640 && width < 978):
        return 2;

      case (width >= 978 && width < 1200):
        return 3;

      case (width >= 1200):
        return 4;

      default:
        return 1;
    }
  }, [width, phones]);

  const getPhones = async () => {
    setIsLoaded(true);

    try {
      const phonesFromApi = await getArrangedPhones(orderType);

      if (orderType === 'price') {
        phonesFromApi.sort((phoneA, phoneB) => {
          const discountPhoneA: number = phoneA.fullPrice - phoneA.price;
          const discountPhoneB: number = phoneB.fullPrice - phoneB.price;

          return discountPhoneB - discountPhoneA;
        })
      }
      setIsLoaded(false);
      setPhones(phonesFromApi);
    } catch (err: any) {
      setIsLoaded(false);
      throw new Error(err);
    }
  };

  const lastSlidePosition = useMemo(() => Math.ceil(carouselSlides / step), [width, phones]);
  const isStart = position === 1;
  const isEnd = lastSlidePosition === position;

  const moveRight = () => {
    if ((position + 1) <= lastSlidePosition) {
      setPosition(position + 1);
      setTranslateX(curr => curr - frameSize)
    }
  };

  const moveLeft = () => {
    if ((position - 1) !== 0) {
      setPosition(position - 1);
      setTranslateX(curr => curr + frameSize)
    }
  };

  useEffect(() => {
    setPosition(1);
    setTranslateX(0);
  }, [width, phones])

  useEffect(() => {
    getPhones();
  }, [])


  return (
    <section className="Carusel grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25">
      <div className="Carusel__top">
        <h2 className="Carusel__title">{title}</h2>

        {!isLoaded && <div className="Carusel__btns">
          <button
            className="Carusel__btn"
            type="button"
            onClick={moveLeft}
            disabled={isStart}
          >
            <img
              className={classNames(
                { 'Carusel__img-off': isStart },
              )}
              src={leftArrow}
              alt="btn"
            />
          </button>
          <button
            className="Carusel__btn"
            type="button"
            onClick={moveRight}
            disabled={isEnd}
          >
            <img
              className={classNames(
                { 'Carusel__img-off': isEnd },
              )}
              src={rightArrow}
              alt="btn"
            />
          </button>
        </div>}
      </div>

      {isLoaded
        ? <Loader />
        : (<div className="Carusel__wrap grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25">
            <ul
              className="Carusel__list"
              style={{
                transform: `translateX(${translateX}px)`,
                transition: '0.8s',
              }}
            >
              {phones && phones.map(phone => (
                <ProductCard
                  key={phone.name}
                  path={path}
                  phone={phone}
                  updateUserData={() => {}}
                />
              ))}
            </ul>
          </div>)
      }
    </section>
  );
};
