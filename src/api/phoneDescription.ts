import axios from 'axios';
import { PhoneDescr } from '../utils/types/PhoneDescription';
import { Phone } from '../types/Phone';

const BASE_URL = 'https://team-404-mate.netlify.app/.netlify/functions/server/phones'

export const getPhones = async () => {
  return await axios.get<Phone[]>(BASE_URL)
    .then((response) => response.data);
}

export const getPhoneDescription = async (id :string) => {
  return await axios.get<PhoneDescr>(BASE_URL+'/'+id)
    .then((response) => response.data);
};

export const getAllPhones = async() => {
  return await axios.get<Phone[]>(BASE_URL)
    .then((response) => response.data);
};

export const getFavouritesPhones = async(favourites: string) => {
  console.log(BASE_URL+`?favourites=${favourites}`);

  return await axios.get<Phone[]>(BASE_URL+`?favourites=${favourites}`)
    .then((response) => response.data);
};
