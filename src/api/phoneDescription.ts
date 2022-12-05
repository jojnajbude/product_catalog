import axios from 'axios';
import { PhoneDescr } from '../utils/types/PhoneDescription';
import { Phone } from '../types/Phone';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const BASE_URL = 'https://team-404-mate.netlify.app/.netlify/functions/server/phones'

export const getPhones = async () => {
  return await wait(500)
    .then(async () => await axios.get<Phone[]>(BASE_URL)
    .then((response) => response.data));
}

export const getPhoneDescription = async (id :string) => {
  return await wait(500)
    .then(async () => await axios.get<PhoneDescr>(BASE_URL+'/'+id)
    .then((response) => response.data));
};

export const getAllPhones = async() => {
  return await wait(500)
    .then(async () => await axios.get<Phone[]>(BASE_URL)
      .then((response) => response.data));
};

export const getFavouritesPhones = async(favourites: string) => {
  return await wait(500)
    .then(async () => await axios.get<Phone[]>(BASE_URL+`?favourites=${favourites}`)
    .then((response) => response.data));
};

export const getArrangedPhones = async(orderType: string) => {
  return await wait(500)
    .then(async () => await axios.get<Phone[]>(BASE_URL+`?orderType=${orderType}`)
    .then((response) => response.data));
};
