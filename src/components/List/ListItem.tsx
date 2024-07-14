import { Link, useLocation } from 'react-router-dom';
import { Pockemon } from '../../types/Pockemon';

import * as cls from './ListItem.module.css';

interface ListItemProps {
  item: Pockemon;
}

function ListItem({ item }: ListItemProps) {
  const { url = '' } = item;
  const parts = url.split('/').filter((el) => !!el);

  const location = useLocation();
  const pockemonId = parts[parts.length - 1] || item.id;

  return (
    <li className={cls.List__item} key={item.name}>
      <p>{item.name}</p>
      <Link to={`/pockemon/${pockemonId}${location.search}`}>Learn more</Link>
    </li>
  );
}

export default ListItem;
