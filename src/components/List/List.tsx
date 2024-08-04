import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pockemon } from '../../types/Pockemon';
import ListItem from './ListItem';

import * as cls from './List.module.css';

type Props = {
  items: Pockemon[];
};

function List({ items }: Props) {
  const { pockemon } = useParams();
  const [isPartWidth, setIsPartWidth] = useState(!!pockemon);

  useEffect(() => {
    setIsPartWidth(!!pockemon);
  }, [pockemon]);

  if (items.length === 0) {
    return <p data-testid="no-cards">The pockemons list is empty</p>;
  }

  return (
    <ul className={`${cls.List} ${isPartWidth ? cls.ListPart : cls.ListFull}`} data-testid="list">
      {items.map((item) => (
        <ListItem item={item} key={item.name} />
      ))}
    </ul>
  );
}

export default List;
