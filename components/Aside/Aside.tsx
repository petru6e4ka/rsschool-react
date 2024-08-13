import { useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useClickOutside } from '@/hooks/useClickOutside';

import * as styles from './Aside.module.css';
import DetailedPockemon from '../DetailedPockemon/DetailedPockemon';

function Aside() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = new URLSearchParams(Array.from(searchParams.entries())).toString();

  const asideRef = useRef(null);

  const onClickOutside = () => {
    router.push(`../?${currentSearch}`);
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
