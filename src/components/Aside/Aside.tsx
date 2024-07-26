import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../store';
import { loadSelectedPockemon, useSelectedPockemonSelector } from '../../store/selectedPockemon';
import Loader from '../Loader/Loader';
import ErrorNotification from '../Error/ErrorNotification';
import { useActions } from '../../hooks/useActions';

import * as cls from './Aside.module.css';

function Aside() {
  const { pockemon } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { error, isLoading, pockemon: selectedPockemon } = useSelectedPockemonSelector();
  const { resetSelectedPockemon } = useActions();

  const asideRef = useRef(null);

  useEffect(() => {
    if (pockemon) {
      dispatch(loadSelectedPockemon(pockemon));
    }
  }, [pockemon]);

  const onClickOutside = () => {
    navigate(`../${location.search}`);
    resetSelectedPockemon();
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
      <div className={cls.Backdrop} />
      <div className={cls.Aside} ref={asideRef} data-testid="aside">
        <button className={cls.Aside__close} onClick={onClickOutside} type="button" data-testid="close-detailed-card">
          +
        </button>
        {isLoading && <Loader />}
        {error && <ErrorNotification message={error} />}
        {selectedPockemon && (
          <div data-testid="pockemon-info">
            <h2 className={cls.Aside__info}>
              Name:
              <br />
              {selectedPockemon.name.toUpperCase()}
            </h2>
            <img src={selectedPockemon.sprites?.front_default} alt={selectedPockemon.name} />
            <div>
              Abilities:
              <br />
              <ul>{selectedPockemon.abilities?.map((ability) => <li key={ability.ability.name}>{ability.ability.name}</li>)}</ul>
            </div>
            <p className={cls.Aside__info}>
              Height:
              <br />
              {selectedPockemon.height}
            </p>
            <p className={cls.Aside__info}>
              Weight:
              <br />
              {selectedPockemon.weight}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Aside;
