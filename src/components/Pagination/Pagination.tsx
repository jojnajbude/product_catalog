import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';

import './Pagination.scss';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
};

function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  setCurrentPage,
}) => {
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(4);

  const lastPage = useMemo(() => {
    return Math.ceil(total / perPage);
  }, [total, perPage]);

  const pages = useMemo(() => {
    return getNumbers(1, lastPage)
  }, [lastPage]);

  const visiblePages = useMemo(() => {
    return pages.slice(start - 1, end);
  }, [pages, start, end]);

  const goToPrevious = useCallback(() => {
    if (currentPage === 1) {
      return;
    }

    setCurrentPage(curr => curr - 1);

    if (currentPage === start) {
      setEnd(end => end - 1);
      setStart(start => start - 1);
    }
  }, [currentPage, setCurrentPage, start]);

  const setClickedPage = useCallback((clickedPage: number) => {
    setCurrentPage(clickedPage);
  }, [setCurrentPage]);

  const goToNext = useCallback(() => {
    if (currentPage === lastPage) {
      return;
    }

    setCurrentPage(curr => curr + 1);

    if (currentPage === end) {
      setEnd(end => end + 1);
      setStart(start => start + 1);
    }

  }, [currentPage, setCurrentPage, lastPage, end]);

  return (
    <ul className='pagination'>
      <li 
        className={classNames(
          'pagination__arrow',
          'pagination__arrow--left',
          {
            'pagination__arrow--disable': currentPage === 1,
          },
        )}
        onClick={goToPrevious}
      ></li>
      {visiblePages.map((page) => (
        <li 
          className={classNames(
            'pagination__page-link',
            {
              'pagination__page-link--active': currentPage === page,
            },
          )}
          onClick={() => setClickedPage(page)}
          key={page}
        >
          {page}
        </li>
      ))}

      <li 
        className={classNames(
          'pagination__arrow',
          'pagination__arrow--right',
          {
            'pagination__arrow--disable': currentPage === lastPage,
          },
        )}
        onClick={goToNext}
      ></li>
    </ul>
  );
};