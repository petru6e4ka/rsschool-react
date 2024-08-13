import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_LIMIT, TOTAL } from '@/store/api';
import searchParamsUpdate from '@/utils/searchParamsUpdate/searchParamsUpdate';
import cn from 'classnames';
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

  if (arr.length === NOT_ENOUGH && arr[0] === FIRST && totalQty >= 3) {
    arr.push(3);
  }

  if (arr.length === NOT_ENOUGH && arr[0] !== FIRST) {
    arr.unshift(totalQty - 2);
  }

  return arr;
};

function Pagination({ total = TOTAL, perPage = DEFAULT_LIMIT }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pagesQuantity = Math.ceil(total / perPage);

  const currentPage = Number(searchParams.get('page')) || 1;

  const changePage = (page: number) => {
    if (page !== currentPage) {
      router.push(`${pathname}${searchParamsUpdate('page', String(page), searchParams)}`);
    }
  };

  const buttons = getArray(currentPage, pagesQuantity);

  if (pagesQuantity <= 1) {
    return null;
  }

  if (pagesQuantity <= 5) {
    return (
      <div className={styles.PaginationShort} data-testid="pagination">
        <ol className={styles.PaginationList}>
          {new Array(pagesQuantity).fill(Math.random()).map((i, el: number) => (
            <li className={styles.PaginationItem} key={Math.random() + i}>
              <button
                className={cn({ [styles.PaginationActive]: currentPage === el + 1 })}
                onClick={() => changePage(el + 1)}
                type="button"
                data-testid="pagination-btn"
              >
                {el + 1}
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }

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
