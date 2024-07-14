import { useParams } from 'react-router-dom';
import * as cls from './Aside.module.css';

function Aside() {
  const { pockemon } = useParams();

  return (
    <div className={cls.Aside}>
      <p>{pockemon}</p>
    </div>
  );
}

export default Aside;
