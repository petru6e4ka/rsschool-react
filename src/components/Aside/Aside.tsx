import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import Loader from '../Loader/Loader';
import { useGetPockemonQuery } from '../../store/api';

import * as styles from './Aside.module.css';

function Aside() {
  const { pockemon } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data, isError, isSuccess, isFetching,
  } = useGetPockemonQuery(pockemon || skipToken);

  const asideRef = useRef(null);

  const onClickOutside = () => {
    navigate(`../${location.search}`);
  };

  useEffect(() => {
    const listener = (event: TouchEvent | MouseEvent) => {
      if (!asideRef || !asideRef.current) {
        return;
      }

      const elem = asideRef.current as never as HTMLDivElement;

      if (elem?.contains(event.target as Node)) {
        return;
      }
      onClickOutside();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [asideRef, onClickOutside]);

  return (
    <>
      <div className={styles.Backdrop} />
      <div className={styles.Aside} ref={asideRef} data-testid="aside">
        <button className={styles.AsideClose} onClick={onClickOutside} type="button" data-testid="close-detailed-card">
          +
        </button>
        {isFetching && <Loader />}
        {isError && <div className={styles.AsideError}>Can&lsquo;t load the pockemon, please, try later</div>}
        {!isFetching && !isError && isSuccess && (
          <div data-testid="pockemon-info">
            <h2 className={styles.AsideInfo}>
              Name:
              <br />
              {data.name.toUpperCase()}
            </h2>
            <img src={data.sprites?.front_default} alt={data.name} />
            <div>
              Abilities:
              <br />
              <ul>{data.abilities?.map((ability) => <li key={ability.ability.name}>{ability.ability.name}</li>)}</ul>
            </div>
            <p className={styles.AsideInfo}>
              Height:
              <br />
              {data.height}
            </p>
            <p className={styles.AsideInfo}>
              Weight:
              <br />
              {data.weight}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Aside;
