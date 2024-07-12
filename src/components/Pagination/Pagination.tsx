import { DEFAULT_LIMIT, TOTAL } from '../../services/api/api';

import * as cls from './Pagination.module.css';

type Props = {
  total?: number;
  perPage?: number;
  currentPage?: number;
  onChange: (page: number) => void;
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

function Pagination({
  total = TOTAL,
  perPage = DEFAULT_LIMIT,
  currentPage = 1,
  onChange,
}: Props) {
  const pagesQuantity = Math.ceil(total / perPage);

  const changePage = (page: number) => {
    if (page !== currentPage) {
      onChange(page);
    }
  };

  const buttons = getArray(currentPage, pagesQuantity);

  return (
    <div className={cls.Pagination}>
      <ol className={cls.Pagination__list}>
        {buttons[0] !== 1 && (
          <>
            <li className={cls.Pagination__item} key={1}>
              <button onClick={() => changePage(1)} type="button">
                1
              </button>
            </li>
            <li className={cls.Pagination__empty}>...</li>
          </>
        )}
        {buttons.map((el: number) => (
          <li className={cls.Pagination__item} key={el}>
            <button
              className={currentPage === el ? cls.Pagination__active : ''}
              onClick={() => changePage(el)}
              type="button"
            >
              {el}
            </button>
          </li>
        ))}
        {buttons[buttons.length - 1] !== pagesQuantity && (
          <>
            <li className={cls.Pagination__empty}>...</li>
            <li className={cls.Pagination__item} key={pagesQuantity}>
              <button onClick={() => changePage(pagesQuantity)} type="button">
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
