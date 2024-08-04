import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import DetailedPockemon from '../DetailedPockemon/DetailedPockemon';
import { useClickOutside } from '../../hooks/useClickOutside';

import * as styles from './Aside.module.css';

function Aside() {
  const navigate = useNavigate();
  const location = useLocation();

  const asideRef = useRef<HTMLDivElement>(null);

  const onClickOutside = () => {
    navigate(`../${location.search}`);
  };

  useClickOutside<HTMLDivElement, () => void>(asideRef, onClickOutside);

  return (
    <>
      <div className={styles.Backdrop} />
      <div className={styles.Aside} ref={asideRef} data-testid="aside">
        <button className={styles.AsideClose} onClick={onClickOutside} type="button" data-testid="close-detailed-card">
          +
        </button>
        <DetailedPockemon />
      </div>
    </>
  );
}

export default Aside;
