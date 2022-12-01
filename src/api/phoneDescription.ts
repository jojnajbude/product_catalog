import axios from 'axios';
import { PhoneDescr } from '../utils/types/PhoneDescription';

const BASE_URL = 'https://productcatalogapi-production.up.railway.app/phones/'

export const getPhoneDescription = async (id :string) => {
  return await axios.get<PhoneDescr>(BASE_URL+id)
    .then((response) => response.data);
}
