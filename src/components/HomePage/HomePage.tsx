import React from "react";
import './HomePage.scss';

import { getAllPhones, getAllTablets, getAllAccessories } from "../../api/api";

import { ProductsSlider } from "../ProductsSlider";
import { Carusel } from "../Carusel";
import { Categories } from "../Categories";

export const HomePage: React.FC = () => {
  const phones = async () => getAllPhones();
  const tablets = async () => getAllTablets();
  const accessories = async () => getAllAccessories();

  const phonesCount = phones.length;
  const tabletsCount = tablets.length;
  const accessoriesCount = accessories.length;

  const newModels = async () => {
    const newPhones = await getAllPhones();

    return newPhones.sort((phone1, phone2) => phone1.year - phone2.year)
  }

  const hotPrices = async () => {
    const hotPhones = await getAllPhones();

    return hotPhones.sort((phone1, phone2) => phone2.price - phone1.price)
  }

  return (
    <div className="homepage grid grid-mobile grid-tablet grid-desktop">
      <h1 className="homepage__title grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-25">
        Welcome to Nice Gadgets store!
      </h1>

      {/* <ProductsSlider /> */}

      <Carusel
        orderType="year"
        title="Brand new models"
        path='home'
      />

      {/* <Categories
        phonesCount={phonesCount}
        tabletCount={tabletsCount}
        accessoriesCount={accessoriesCount}
      /> */}

      <Carusel
        orderType="price"
        title="Hot prices"
        path='home'
      />
    </div>
  )
}
