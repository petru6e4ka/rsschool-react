import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DetailedPockemon from '../DetailedPockemon/DetailedPockemon';
import { useClickOutside } from '../../hooks/useClickOutside';

import * as styles from './Aside.module.css';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const aside = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 2 },
  },
};

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
      <AnimatePresence>
        <motion.div className={styles.Backdrop} variants={backdrop} initial="hidden" animate="visible" exit="hidden" />
      </AnimatePresence>
      <AnimatePresence>
        <motion.div className={styles.Aside} variants={aside} ref={asideRef} data-testid="aside">
          <button className={styles.AsideClose} onClick={onClickOutside} type="button" data-testid="close-detailed-card">
            +
          </button>
          <DetailedPockemon />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default Aside;
