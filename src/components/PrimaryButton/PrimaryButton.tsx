import { FC } from 'react';

import './PrimaryButton.scss';

type Props = {
  title: string;
  handler: () => void
}

export const PrimaryButton: FC<Props> = ({ title, handler }) => {
  return (
    <button
      className='primary-button'
      onClick={handler}
    >
      {title}
    </button>
  );
};