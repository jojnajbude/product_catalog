import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { BackButton } from '../../components/Back-Button';
import { Phone } from '../../types/Phone';

import './Cart.scss';
import { PrimaryButton } from '../../components/PrimaryButton';
import { getIdsFromLocal } from '../../utils/customFunctions/getIdsFromLocal';
import { getFavouritesPhones } from '../../api/phoneDescription';
import { Loader } from '../../Loader';

type Props = {};

type Count = {
  phoneId: string;
  price: number
  count: number;
}

export const Cart: React.FC<Props> = () => {
  const phonesIdsFromLocal = getIdsFromLocal('phoneCarts');

  const [phones, setPhones] = useState<Phone[]>([]);

  const [counts, setCounts] = useState<Count[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const initiateCounts = useCallback(() => {
    const getCountsArray = phones.reduce((arr: Count[], phone) => {
      const { phoneId, price } = phone;
  
      const count: Count = {
        phoneId,
        price: price,
        count: 1,
      };
  
      arr.push(count);
  
      return arr;
    }, []);

    setCounts(getCountsArray);
  }, [phones]);

  const addCount = (phoneId: string) => {
    setCounts(current => {
      const finded = current.find(count => count.phoneId === phoneId);

      if (finded && finded.count < 5) {
        finded.count += 1;

        return [
          ...current.filter(phone => phone.phoneId !== phoneId),
          finded,
        ];
      }

      return current;
    });
  };

  const removeCount = (phoneId: string) => {
    setCounts(current => {
      const finded = current.find(count => count.phoneId === phoneId);

      if (finded && finded.count > 1) {
        finded.count -= 1;

        return [
          ...current.filter(phone => phone.phoneId !== phoneId),
          finded,
        ];
      }

      return current;
    });
  };

  const totalPrice = counts.reduce((sum, count) => {
    return sum + (count.count * count.price);
  }, 0);

  const totalItems = counts.reduce((sum, count) => sum + count.count, 0);

  const loadPhones = useCallback(async() => {
    setIsLoading(true);

    try {
      const phonesData = await getFavouritesPhones(phonesIdsFromLocal);

      setPhones(phonesData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  }, [phonesIdsFromLocal]);

  const handlerDeleteFromCart = (productId: string) => {
    const newIdsArray = getIdsFromLocal('phoneCarts')
      .split(',')
      .filter(id => id !== productId);

    localStorage.setItem('phoneCarts', newIdsArray.join(','));
    loadPhones();
  };

  useEffect(() => {
    loadPhones();
  }, [loadPhones]);

  useEffect(() => {
    initiateCounts();
  }, [phones, initiateCounts]);


  return (
    <div className='container'>
      <section className='cart'>
      <BackButton />

      <h1 className='cart__title'>
        Cart
      </h1>

      <div className="
        cart__container
        grid
        grid-desktop"
      >
        {isLoading && <Loader />}
        {(phones.length > 0 && !isLoading) && (
          <>
          <div className='grid-desktop-1-17'>
            {phones.map(phone => {
              const { image, name, price, phoneId} = phone; // here needs to destuction image path too!!!

              const imagePath = require('../../images/' + image);

              const count = counts
                .find(findedCount => findedCount.phoneId === phoneId);

              return count && (
                <div className={classNames(
                  'cart__product-cart',
                  'product-cart',
                )} key={phoneId}>
                  <div
                    className='product-cart__delete'
                    onClick={() => handlerDeleteFromCart(phoneId)}
                  />

                  <div className='product-cart__image-box'>
                    <img
                      src={ imagePath }
                      className='product-cart__image'
                      alt="Phone"
                    />
                  </div>

                  <div className='product-cart__title'>
                    {name}
                  </div>

                  <div className='product__counter counter'>
                    <div className={classNames(
                      'counter__minus',
                      {
                        'counter__minus--disable': count.count === 1,
                      }
                    )}
                    onClick={() => removeCount(phoneId)}
                  />
                    <div className="counter__value"> {count.count} </div>
                    <div
                      className={classNames(
                        'counter__plus',
                        {
                          'counter__plus--disable': count.count === 5,
                        },
                      )} 
                      onClick={() => addCount(phoneId)}
                    />
                  </div>

                  <div className="product-cart__price">
                    ${price}
                  </div> 
                </div>
              );
          })}
        </div>

        <div className='cart__bill grid-desktop-17-25 bill'>
          <div className="bill__total-price">
            ${totalPrice}
          </div>
          <div className='bill__items'>
            {`Total for ${totalItems} items`}
          </div>

          <div className='bill__line'/>

          <PrimaryButton
            title='Checkout'
            handler={() => {}}
          />
        </div>
          </>
        )}

        {(phones.length === 0 && !isLoading) && (
          (
            <div className='cart__empty-box grid-desktop-1-25'>
              No products in the cart
            </div>
          )
        )}
      </div>
    </section>
    </div>
  )
};