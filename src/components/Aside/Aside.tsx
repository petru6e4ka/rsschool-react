import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getPockemon } from '../../services/api/api';
import { Pockemon } from '../../types/Pockemon';
import Loader from '../Loader/Loader';
import ErrorNotification from '../Error/ErrorNotification';

import * as cls from './Aside.module.css';

interface State {
  isLoading: boolean;
  error: null | {
    message: string;
  };
  info: Pockemon | null;
}

function Aside() {
  const { pockemon } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [pockemonInfo, setPockemonInfo] = useState<State>({
    isLoading: false,
    error: null,
    info: null,
  });

  const asideRef = useRef(null);

  useEffect(() => {
    setPockemonInfo({
      isLoading: true,
      error: null,
      info: null,
    });

    if (pockemon) {
      getPockemon(pockemon)
        .then((response) => {
          setPockemonInfo({
            isLoading: false,
            error: null,
            info: response,
          });
        })
        .catch((error) => {
          setPockemonInfo({
            isLoading: false,
            error: {
              message: error.message,
            },
            info: null,
          });
        });
    }
  }, [pockemon]);

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
    <div className={cls.Aside} ref={asideRef}>
      <button
        className={cls.Aside__close}
        onClick={onClickOutside}
        type="button"
      >
        +
      </button>
      {pockemonInfo.isLoading && <Loader />}
      {pockemonInfo.error && (
        <ErrorNotification message={pockemonInfo.error.message} />
      )}
      {pockemonInfo.info && (
        <>
          <h2 className={cls.Aside__info}>
            Name:
            <br />
            {pockemonInfo.info.name.toUpperCase()}
          </h2>
          <img
            src={pockemonInfo.info.sprites?.front_default}
            alt={pockemonInfo.info.name}
          />
          <div>
            Abilities:
            <br />
            <ul>
              {pockemonInfo.info.abilities?.map((ability) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>
          <p className={cls.Aside__info}>
            Height:
            <br />
            {pockemonInfo.info.height}
          </p>
          <p className={cls.Aside__info}>
            Weight:
            <br />
            {pockemonInfo.info.weight}
          </p>
        </>
      )}
    </div>
  );
}

export default Aside;
