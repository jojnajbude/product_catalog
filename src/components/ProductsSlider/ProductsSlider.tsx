import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './ProductsSlider.scss';
import { sliderData } from './ProductsSliderData';

import leftArrow from '../../images/arrow-left.svg';
import rightArrow from '../../images/arrow-right.svg';

export const ProductsSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = 3;

  const autoScroll = true;
  let slideInterval: NodeJS.Timer;
  const intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  };

  const auto = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }

    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <section className="productsSlider grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25">
      <div className="productsSlider__wrap">
        <button
          type="button"
          className="productsSlider__btn"
          onClick={prevSlide}
        >
          <img src={leftArrow} alt="btn" />
        </button>

        <div className="productsSlider__container">
          {sliderData.map((slide, index: number) => {
            return (
              <img
                key={slide.id}
                src={slide.image}
                alt="slide"
                className={classNames(
                  'productsSlider__img',
                  { 'productsSlider__img--act': index === currentSlide },
                )}
              />
            );
          })}
        </div>

        <button
          type="button"
          className="productsSlider__btn"
          onClick={nextSlide}
        >
          <img src={rightArrow} alt="btn" />
        </button>
      </div>

      <div className="productsSlider__indicators">
        <button
          aria-label="Mute volume"
          className={classNames(
            'productsSlider__indicator',
            { 'productsSlider__indicator--active': currentSlide === 0 },
          )}
          type="button"
          onClick={() => setCurrentSlide(0)}
        />

        <button
          aria-label="Mute volume"
          className={classNames(
            'productsSlider__indicator',
            { 'productsSlider__indicator--active': currentSlide === 1 },
          )}
          type="button"
          onClick={() => setCurrentSlide(1)}
        />

        <button
          aria-label="Mute volume"
          className={classNames(
            'productsSlider__indicator',
            { 'productsSlider__indicator--active': currentSlide === 2 },
          )}
          type="button"
          onClick={() => setCurrentSlide(2)}
        />
      </div>
    </section>
  );
};