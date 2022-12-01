import { FC } from 'react';

import './BackButton.scss';

type Props = {};

export const BackButton: FC<Props> = () => {
  return (
    <button className='back-button'>
      <div className='back-button__image'/>
      <span className='back-button__title'>Back</span>
    </button>
  )
};