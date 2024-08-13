import { skipToken } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useGetPockemonQuery } from '../../store/api';
import Loader from '../Loader/Loader';

import * as styles from './DetailedPockemon.module.css';

function DetailedPockemon() {
  const router = useRouter();
  const { pockemonId } = router.query;
  const pockemon = pockemonId ? String(pockemonId) : '';

  const { data, isError, isFetching } = useGetPockemonQuery(pockemon || skipToken);

  if (isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <div className={styles.PockemonError}>Can&lsquo;t load the pockemon, please, try later</div>;
  }

  return (
    <div data-testid="pockemon-info">
      <h2 className={styles.AsideInfo}>
        Name:
        <br />
        {data?.name.toUpperCase()}
      </h2>
      <Image src={data?.sprites?.front_default || ''} alt={data?.name || ''} className="dark:invert" priority width={100} height={100} />
      <div>
        Abilities:
        <br />
        <ul>{data?.abilities?.map((ability) => <li key={ability.ability.name}>{ability.ability.name}</li>)}</ul>
      </div>
      <p className={styles.AsideInfo}>
        Height:
        <br />
        {data?.height}
      </p>
      <p className={styles.AsideInfo}>
        Weight:
        <br />
        {data?.weight}
      </p>
    </div>
  );
}

export default DetailedPockemon;
