import React from "react";
import './HomePage.scss';

import { getAllTablets, getAllAccessories } from "../../api/api";
import { getAllPhones } from "../../api/phoneDescription";

import { ProductsSlider } from "../ProductsSlider";
import { Carusel } from "../Carusel";
import { Categories } from "../Categories";

export const HomePage: React.FC = () => {
  const tablets = async () => getAllTablets();
  const accessories = async () => getAllAccessories();

  const phonesCount = 0;
  const tabletsCount = tablets.length;
  const accessoriesCount = accessories.length;

  return (
    <div className="homepage grid grid-mobile grid-tablet grid-desktop">
      <h1 className="homepage__title grid-mobile-1-5 grid-tablet-1-13 grid-desktop-1-17">
        Welcome to Nice Gadgets store!
      </h1>
 
      <ProductsSlider />

      <Carusel
        orderType="year"
        title="Brand new models"
        path='home'
      />

      <Categories
        phonesCount={phonesCount}
        tabletCount={tabletsCount}
        accessoriesCount={accessoriesCount}
       />

      <Carusel
        orderType="price"
        title="Hot prices"
        path='home'
      />
    </div>
  )
}
