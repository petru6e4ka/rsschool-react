import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { AnimatePresence, motion } from 'framer-motion';
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
    <AnimatePresence>
      <motion.div
        data-testid="pockemon-info"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
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
      </motion.div>
    </AnimatePresence>
  );
}

export default DetailedPockemon;
