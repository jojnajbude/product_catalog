import React, { useCallback, useMemo, useState, useEffect } from 'react';
import classNames from 'classnames';

import './Pagination.scss';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  handlePageChange: (page: number) => void,
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
  handlePageChange,
}) => {
  const lastPage = useMemo(() => {
    return Math.ceil(total / perPage);
  }, [total, perPage]);

  const getDefaultPoints = useCallback(() => {
    if (currentPage < 1) {
      handlePageChange(1);
    } else if (currentPage > lastPage) {
      handlePageChange(lastPage);
    }

    if (currentPage + 4 > lastPage && lastPage > 4) {
      return [lastPage - 3, lastPage];
    }

    if (lastPage < 4) {
      return [1, lastPage];
    }

    return [currentPage, currentPage + 3];
  }, [currentPage, lastPage]);

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(4);

  useEffect(() => {
    const result = getDefaultPoints();
    setStart(result[0]);
    setEnd(result[1]);
  }, []);

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

    handlePageChange(currentPage - 1);

    if (currentPage === start) {
      setEnd(end => end - 1);
      setStart(start => start - 1);
    }
  }, [currentPage, start]);

  const setClickedPage = useCallback((clickedPage: number) => {
    handlePageChange(clickedPage);
  }, []);

  const goToNext = useCallback(() => {
    if (currentPage === lastPage) {
      return;
    }

    handlePageChange(currentPage + 1);

    if (currentPage === end) {
      setEnd(end => end + 1);
      setStart(start => start + 1);
    }

  }, [currentPage, lastPage, end]);

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
      {visiblePages.map(page => (
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
