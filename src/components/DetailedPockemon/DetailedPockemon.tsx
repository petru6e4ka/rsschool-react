import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetPockemonQuery } from '../../store/api';
import Loader from '../Loader/Loader';

import * as styles from './DetailedPockemon.module.css';

function DetailedPockemon() {
  const { pockemon } = useParams();
  const { data, isError, isFetching } = useGetPockemonQuery(pockemon || skipToken);

  if (isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <div className={styles.PockemonError}>Can&lsquo;t load the pockemon, please, try later</div>;
  }

  return (
    <div data-testid="pockemon-info">
      <h2 className={styles.PockemonInfo}>
        Name:
        <br />
        {data?.name.toUpperCase()}
      </h2>
      <img src={data?.sprites?.front_default} alt={data?.name} />
      <div>
        Abilities:
        <br />
        <ul>{data?.abilities?.map((ability) => <li key={ability.ability.name}>{ability.ability.name}</li>)}</ul>
      </div>
      <p className={styles.PockemonInfo}>
        Height:
        <br />
        {data?.height}
      </p>
      <p className={styles.PockemonInfo}>
        Weight:
        <br />
        {data?.weight}
      </p>
    </div>
  );
}

export default DetailedPockemon;
