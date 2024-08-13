import * as styles from './PageError.module.css';

const reloadPage = () => {
  window.location.reload();
};

function PageError() {
  return (
    <div className={styles.PageError}>
      <p className={styles.PageErrorMessage}>Oops! Something went wrong!</p>
      <button onClick={reloadPage} type="button">
        Reload the page
      </button>
    </div>
  );
}

export default PageError;
