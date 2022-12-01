import classNames from 'classnames';
import React, { useState } from 'react';
import { BackButton } from '../../components/Back-Button';
import { Phone } from '../../types/Phone';

import './Cart.scss';
import { PrimaryButton } from '../../components/PrimaryButton';

type Props = {};

type Count = {
  phoneId: string;
  price: number
  count: number;
}

export const Cart: React.FC<Props> = () => {
  const phones: Phone[] = [
    {
      "id": 1,
      "category": "phones",
      "phoneId": "apple-iphone-7-32gb-black",
      "itemId": "apple-iphone-7-32gb-black",
      "name": "Apple iPhone 7 32GB Black",
      "fullPrice": 400,
      "price": 375,
      "screen": "4.7' IPS",
      "capacity": "32GB",
      "color": "black",
      "ram": "2GB",
      "year": 2016,
      "image": "img/phones/apple-iphone-7/black/00.jpg"
    },
    {
      "id": 2,
      "category": "phones",
      "phoneId": "apple-iphone-7-plus-32gb-black",
      "itemId": "apple-iphone-7-plus-32gb-black",
      "name": "Apple iPhone 7 Plus 32GB Black",
      "fullPrice": 540,
      "price": 500,
      "screen": "5.5' IPS",
      "capacity": "32GB",
      "color": "black",
      "ram": "3GB",
      "year": 2016,
      "image": "img/phones/apple-iphone-7-plus/black/00.jpg"
    },
    {
      "id": 3,
      "category": "phones",
      "phoneId": "apple-iphone-8-64gb-gold",
      "itemId": "apple-iphone-8-64gb-gold",
      "name": "Apple iPhone 8 64GB Gold",
      "fullPrice": 600,
      "price": 550,
      "screen": "4.7' IPS",
      "capacity": "64GB",
      "color": "gold",
      "ram": "2GB",
      "year": 2017,
      "image": "img/phones/apple-iphone-8/gold/00.jpg"
    },
  ];

  const [counts, setCounts] = useState<Count[]>(
    phones.reduce((arr: Count[], phone) => {
      const { phoneId, price } = phone;
  
      const count: Count = {
        phoneId,
        price: price,
        count: 1,
      };
  
      arr.push(count);
  
      return arr;
    }, [])
  );

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
        <div className='grid-desktop-1-17'>
          {phones.map(phone => {
            const { name, price, phoneId} = phone; // here needs to destuction image path too!!!

            const imagePath = require('../../images/iphone.png');

            const count = counts
              .find(findedCount => findedCount.phoneId === phoneId);

            return count && (
              <div className={classNames(
                'cart__product-cart',
                'product-cart',
              )} key={phoneId}>
                <div className='product-cart__delete'/>

                <div className='product-cart__image-box'>
                  <img src={ imagePath } alt="Phone" />
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
      </div>
    </section>
    </div>
  )
};