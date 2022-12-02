import axios from 'axios';
import { PhoneDescr } from '../utils/types/PhoneDescription';
import { Phone } from '../types/Phone';

const BASE_URL = 'https://productcatalogapi-production.up.railway.app/phones/'

export const getPhones = async () => {
  return await axios.get<Phone[]>(BASE_URL)
    .then((response) => response.data);
}

export const getPhoneDescription = async (id :string) => {
  return await axios.get<PhoneDescr>(BASE_URL+id)
    .then((response) => response.data);
}
