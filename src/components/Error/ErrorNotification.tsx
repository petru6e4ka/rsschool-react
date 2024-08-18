import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as styles from './ErrorNotification.module.css';

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

  return (
    <AnimatePresence>
      {isShowing ? (
        <motion.div
          initial={{ opacity: 0, right: '-100px' }}
          animate={{ opacity: 1, right: '0px' }}
          exit={{ opacity: 0, right: '-100px' }}
          className={styles.ErrorContainer}
          data-testid="error-notification"
        >
          <h3>{message ? `Error! ${message}` : 'Something went wrong!'}</h3>
          <button className={styles.ErrorBtn} type="button" onClick={closeSearch}>
            +
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default ErrorNotification;
