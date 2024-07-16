import { Pockemon } from '../../types/Pockemon';
import ListItem from './ListItem';

import * as cls from './List.module.css';

interface ListProps {
  items: Pockemon[];
}

function List({ items }: ListProps) {
  if (items.length === 0) {
    return <p data-testid="no-cards">The pockemons list is empty</p>;
  }

  return (
    <ul className={cls.List} data-testid="list">
      {items.map((item) => (
        <ListItem item={item} key={item.name} />
      ))}
    </ul>
  );
}

export default List;
