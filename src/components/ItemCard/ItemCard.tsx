import { useMemo, FC, useEffect, useState, Fragment } from 'react';
import classNames from 'classnames';
import { getPhoneDescription } from '../../api/phoneDescription';
import { PhoneDescr } from '../../utils/types/PhoneDescription';
import { useNavigate, useParams } from 'react-router';
import { Path } from '../Path';
import { Loader } from '../../Loader';
import { Carusel } from '../Carusel';

export const ItemCard: FC = () => {
  const { openedPhoneId = '' } = useParams();
  const [phoneData, setPhoneData] = useState<PhoneDescr | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [phoneId, setPhoneId] = useState(openedPhoneId);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

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

  const isPhoneCartsIncludeId = phoneCarts.includes(phoneId);
  const isFavouritePhonesIncludeId = favouritePhones.includes(phoneId);

  const handlePhoneCarts = () => {
    if (isPhoneCartsIncludeId) {
      const filteredPhoneCarts = phoneCartsStorage().filter(id => id !== phoneId);

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
      const filteredFavouritePhones = favouritePhonesStorage().filter(id => id !== phoneId);

      localStorage.setItem('favouritePhones', filteredFavouritePhones.join(','));
      setFavouritePhones(favouritePhonesStorage());
    } else {
      const completeFavouritePhones = [...favouritePhonesStorage(), phoneId];

      localStorage.setItem('favouritePhones', completeFavouritePhones.join(','));
      setFavouritePhones(favouritePhonesStorage());
    }
  };

  const isPhonesInCartIncludeId = useMemo(() => phoneCarts.includes(phoneId), [phoneCarts]);

  useEffect(() => {
    const phonesInCartToStr = phoneCarts.join(',');

    localStorage.setItem('phoneCarts', phonesInCartToStr);
  }, [phoneCarts]);

  useEffect(() => {
    const favouritePhonesToStr = favouritePhones.join(',');

    localStorage.setItem('favouritePhones', favouritePhonesToStr);
  }, [favouritePhones]);

  const loadPhoneDescription = async () => {
    setIsLoaded(true);
    setPhoneData(null);

    try {
      const phoneDataFromAPI: PhoneDescr = await getPhoneDescription(phoneId);

      setPhoneData(phoneDataFromAPI);
      setIsLoaded(false);
    } catch {
      setIsLoaded(false);
      throw new Error('something wrong')
    }
  };

  const handleImageChange = (index: number) => {
    setCurrentImage(index);
  };

  const handleMouseDown = (event: React.MouseEvent, max: number) => {
    const currentHalfWidth = document.body.clientWidth < 640
      ? document.body.clientWidth / 2
      : (7 * document.body.clientWidth / 24) + 40;
    const click = event.clientX;

    if (click < currentHalfWidth) {
      setCurrentImage(curr => {
        return curr ? curr - 1 : max - 1
      })
    }

    if (click > currentHalfWidth) {
      setCurrentImage(curr => {
        return curr === max - 1 ? 0 : curr + 1
      })
    }
  };

  const handleColorChange = (currentColor: string, color: string) => {
    setPhoneId(current => (
      current.replace(currentColor, color)
    ))
  };

  const handleCapacityChange = (currentCapacity: string, capacity: string) => {
    setPhoneId(current => (
      current.replace(currentCapacity.toLowerCase(), capacity.toLowerCase())
    ))
  }


  useEffect(() => {
    loadPhoneDescription();
    navigate(`/phones/${phoneId}`);
  }, [phoneId]);

  return (
    <>
      <Path />
      {isLoaded ? <Loader /> : <></>}

      {phoneData &&
        <div className='phone-card grid grid-mobile grid-tablet grid-desktop'>
          <h1 className='phone-card__title grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25'>
            {phoneData.name}
          </h1>

          <div
            className="phone-card__main-image-box grid-mobile-1-5 grid-tablet-2-8 grid-desktop-3-13"
            onMouseDown={event => handleMouseDown(event, phoneData.images.length)}
          >
            <img
              src={require(`../../images/${phoneData.images[currentImage]}`)}
              alt={phoneData.name}
              className="phone-card__main-image"
            />
          </div>

          <div className="phone-card__other-photo-box grid-mobile-1-5 grid-tablet-1-2 grid-desktop-1-3">
            {phoneData.images.map((imageLink, i) => {
              const isSelected = i === currentImage;

              return (
                <div
                  key={imageLink}
                  className={classNames(
                    'phone-card__single-photo-box',
                    {'phone-card__single-photo-box--border-white': isSelected,
                    'phone-card__single-photo-box--border-grey': !isSelected,}
                  )}
                  onClick={() => handleImageChange(i)}
                >
                  <img
                    src={require(`../../images/${imageLink}`)}
                    alt={phoneData.name}
                    className="phone-card__preview-image"
                  />
                </div>
              );
            })}
          </div>

          <div className="phone-card__short-info short-info grid-mobile-1-5 grid-tablet-8-13 grid-desktop-14-21">
            <div className="short-info__phone-id">
              ID: 802301
            </div>

            <div className="short-info__colors">
              <h4 className="short-info__title">
                Available colors
              </h4>
              <div className="short-info__colors-options">
                {phoneData.colorsAvailable.map(color => {
                  const isCurrent = color === phoneData.color;

                  return (
                  <div className={classNames(
                    'short-info__color-box',
                    `${color}`,
                    {'short-info__color-box--border-white': isCurrent,
                    'short-info__color-box--border-gray': !isCurrent,
                    }
                    )}
                    key={color}
                    onClick={() => handleColorChange(phoneData.color, color)}
                  >
                  </div>
                )})}
              </div>
            </div>

            <div className="short-info__capacity">
              <h4 className="short-info__title">
                Select capacity
              </h4>

              <div className="short-info__capacity-options">
                {phoneData.capacityAvailable.map(capacity => {
                  const isCurrent = capacity === phoneData.capacity;

                  return (
                    <div className={classNames(
                      {'short-info__capacity-box--current': isCurrent,
                      'short-info__capacity-box--option': !isCurrent,
                      }
                    )}
                      key={capacity}
                      onClick={() => handleCapacityChange(phoneData.capacity, capacity)}
                    >
                      {capacity}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="short-info__price-container">
              <h2 className="short-info__current-price">
              {`$${phoneData.priceDiscount}`}
              </h2>

              <h2 className="short-info__full-price">
                {`$${phoneData.priceRegular}`}
              </h2>
            </div>

            <div className="short-info__buttons-container">
              <button
                className={classNames('short-info__add-button', {
                  'short-info__add-button--is-selected': isPhonesInCartIncludeId
                })}
                onClick={handlePhoneCarts}
              >
                {!isPhonesInCartIncludeId
                  ? 'Add to cart'
                  : 'Added'}
              </button>

              <button
                className={classNames('short-info__like-button', {
                  'short-info__like-button--is-selected': isFavouritePhonesIncludeId
                })}
                onClick={handleFavouritePhones}
              />
            </div>

            <div className="short-info__properties">
              <div className="short-info__properties-line">
                <div className="short-info__properties-name">Screen</div>
                <div className="short-info__properties-value">{phoneData.screen}</div>
              </div>

              <div className="short-info__properties-line">
                <div className="short-info__properties-name">Resolution</div>
                <div className="short-info__properties-value">{phoneData.resolution}</div>
              </div>

              <div className="short-info__properties-line">
                <div className="short-info__properties-name">Processor</div>
                <div className="short-info__properties-value">{phoneData.processor}</div>
              </div>

              <div className="short-info__properties-line">
                <div className="short-info__properties-name">RAM</div>
                <div className="short-info__properties-value">{phoneData.ram}</div>
              </div>
            </div>
          </div>

          <div className="phone-card__about grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-13">
            <h4 className="phone-card__about-title">
              About
            </h4>

            {phoneData.description.map(({title, text}) => {
              return (
              <Fragment key={title}>
                <h5 className="phone-card__about-subtitle">
                  {title}
                </h5>

                {text.map((paragraph, i) => {
                  const isLast = text.length - 1 === i;

                  return (
                    <p
                      key={paragraph}
                      className={classNames(
                        'phone-card__about-text',
                        {'phone-card__about-text-last': isLast}
                      )}
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </Fragment>
              )
            })}
          </div>

          <div className="phone-card__technical grid-mobile-1-5 grid-tablet-1-13 grid-desktop-14-25">
            <h4 className="phone-card__technical-title">
              Tech specs
            </h4>

            <div className="short-info__properties">
              <div className="short-info__properties-line">
                <div className="short-info__properties-name short-info__properties-name--font-size">Screen</div>
                <div className="short-info__properties-value short-info__properties-value--font-size">{phoneData.screen}</div>
              </div>

              <div className="short-info__properties-line">
                <div className="short-info__properties-name short-info__properties-name--font-size">Resolution</div>
                <div className="short-info__properties-value short-info__properties-value--font-size">{phoneData.resolution}</div>
              </div>

              <div className="short-info__properties-line">
                <div className="short-info__properties-name short-info__properties-name--font-size">Processor</div>
                <div className="short-info__properties-value short-info__properties-value--font-size">{phoneData.processor}</div>
              </div>

              <div className="short-info__properties-line">
                <div className="short-info__properties-name short-info__properties-name--font-size">RAM</div>
                <div className="short-info__properties-value short-info__properties-value--font-size">{phoneData.ram}</div>
              </div>

              <div className="short-info__properties-line">
                <div className="short-info__properties-name short-info__properties-name--font-size">Built in memory</div>
                <div className="short-info__properties-value short-info__properties-value--font-size">{phoneData.capacity}</div>
              </div>

              <div className="short-info__properties-line">
                <div className="short-info__properties-name short-info__properties-name--font-size">Camera</div>
                <div className="short-info__properties-value short-info__properties-value--font-size">
                  {`${phoneData.camera} ${phoneData.camera.split('+').length === 3 ? '(Triple)' : '(Double)' }`}
                </div>
              </div>

              <div className="short-info__properties-line">
                <div className="short-info__properties-name short-info__properties-name--font-size">Zoom</div>
                <div className="short-info__properties-value short-info__properties-value--font-size">{phoneData.zoom}</div>
              </div>

              <div className="short-info__properties-line">
                <div className="short-info__properties-name short-info__properties-name--font-size">Cell</div>
                <div className="short-info__properties-value short-info__properties-value--font-size">{phoneData.cell.join(', ')}</div>
              </div>
            </div>
          </div>
      </div>}

      <Carusel
        orderType="price"
        title="You may also like"
        path='phones'
      />
    </>
  )
}
