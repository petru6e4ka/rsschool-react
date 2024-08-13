import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Pockemon } from '../../types/Pockemon';
import ListItem from './ListItem';

import * as styles from './List.module.css';

type ListProps = {
  items: Pockemon[];
};

function List({ items }: ListProps) {
  const router = useRouter();
  const { pockemonId } = router.query;
  const [isPartWidth, setIsPartWidth] = useState(!!pockemonId);

  useEffect(() => {
    setIsPartWidth(!!pockemonId);
  }, [pockemonId]);

  if (items.length === 0) {
    return <p data-testid="no-cards">The pockemons list is empty</p>;
  }

  return (
    <ul className={`${styles.List} ${isPartWidth ? styles.ListPart : styles.ListFull}`} data-testid="list">
      {items.map((item) => (
        <ListItem item={item} key={item.name} />
      ))}
    </ul>
  );
}

export default List;
