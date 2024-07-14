import { Pockemon } from '../../types/Pockemon';
import ListItem from './ListItem';

import * as cls from './List.module.css';

interface ListProps {
  items: Pockemon[];
}

function List({ items }: ListProps) {
  return (
    <ul className={cls.List}>
      {items.map((item) => (
        <ListItem item={item} key={item.name} />
      ))}
    </ul>
  );
}

export default List;
