import { Pockemon } from '../../types/Pockemon';

import * as cls from './List.module.css';

interface ListProps {
  items: Pockemon[];
}

function List({ items }: ListProps) {
  return (
    <ul className={cls.List}>
      {items.map((item) => (
        <li className={cls.List__item} key={item.name}>
          <p>{item.name}</p>
          <button type="button">Learn more</button>
        </li>
      ))}
    </ul>
  );
}

export default List;
