import { useSearchParams } from 'react-router-dom';
import { DEFAULT_LIMIT, TOTAL } from '../../services/api/api';

import * as styles from './Pagination.module.css';

type Props = {
  total?: number;
  perPage?: number;
};

const getArray = (current: number, totalQty: number) => {
  const arr = [];
  const NOT_ENOUGH = 2;
  const FIRST = 1;

  for (let i = 1; i <= totalQty; i += 1) {
    if (i >= current - 1 && i <= current + 1) {
      arr.push(i);
    }
  }

  if (arr.length === NOT_ENOUGH && arr[0] === FIRST) {
    arr.push(3);
  }

  if (arr.length === NOT_ENOUGH && arr[0] !== FIRST) {
    arr.unshift(totalQty - 2);
  }

  return arr;
};

function Pagination({ total = TOTAL, perPage = DEFAULT_LIMIT }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pagesQuantity = Math.ceil(total / perPage);
  const currentPage = Number(searchParams.get('page')) || 1;

  const changePage = (page: number) => {
    const allParams = Object.fromEntries(searchParams.entries());

    if (page !== currentPage) {
      setSearchParams({ ...allParams, page: String(page) });
    }
  };

  const buttons = getArray(currentPage, pagesQuantity);

  return (
    <div className={styles.Pagination} data-testid="pagination">
      <ol className={styles.PaginationList}>
        {buttons[0] !== 1 && (
          <>
            <li className={styles.PaginationItem} key={1}>
              <button onClick={() => changePage(1)} type="button" data-testid="pagination-btn">
                1
              </button>
            </li>
            <li className={styles.PaginationEmpty}>...</li>
          </>
        )}
        {buttons.map((el: number) => (
          <li className={styles.PaginationItem} key={el}>
            <button
              className={currentPage === el ? styles.PaginationActive : ''}
              onClick={() => changePage(el)}
              type="button"
              data-testid="pagination-btn"
            >
              {el}
            </button>
          </li>
        ))}
        {buttons[buttons.length - 1] !== pagesQuantity && (
          <>
            <li className={styles.PaginationEmpty}>...</li>
            <li className={styles.PaginationItem} key={pagesQuantity}>
              <button onClick={() => changePage(pagesQuantity)} type="button" data-testid="pagination-btn">
                {pagesQuantity}
              </button>
            </li>
          </>
        )}
      </ol>
    </div>
  );
}

export default Pagination;
