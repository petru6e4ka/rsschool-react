import { useEffect, useState } from 'react';

import * as cls from './ErrorNotification.module.css';

type Props = {
  message?: string;
};

function ErrorNotification({ message = '' }: Props) {
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsShowing(false);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const closeSearch = () => {
    setIsShowing(false);
  };

  return isShowing ? (
    <div className={cls.Error__container} data-testid="error-notification">
      <h3>{message ? `Error! ${message}` : 'Something went wrong!'}</h3>
      <button className={cls.Error__btn} type="button" onClick={closeSearch}>
        +
      </button>
    </div>
  ) : null;
}

export default ErrorNotification;
