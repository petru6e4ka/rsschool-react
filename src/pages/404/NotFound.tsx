import { useNavigate } from 'react-router-dom';
import * as styles from './NotFound.module.css';

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.NotFound} data-testid="not-found-page">
      <h1>The page is not found</h1>
      <p>Oops, you can go back</p>
      <button type="button" onClick={goBack}>
        Go back!
      </button>
    </div>
  );
}

export default NotFound;
