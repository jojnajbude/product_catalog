import { Phone } from "../types/Phone";
import { server } from '../utils/fetchClient';

export const getAllPhones = () => {
  return server.get<Phone[]>(`/phones`);
};

export const getAllTablets = () => {
  return server.get<Phone[]>(`/tablets`);
};

export const getAllAccessories = () => {
  return server.get<Phone[]>(`/accessories`);
};