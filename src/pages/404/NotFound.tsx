import { useNavigate } from 'react-router-dom';
import * as cls from './NotFound.module.css';

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={cls.NotFound}>
      <h1>The page is not found</h1>
      <p>Oops, you can go back</p>
      <button type="button" onClick={goBack}>
        Go back!
      </button>
    </div>
  );
}

export default NotFound;
