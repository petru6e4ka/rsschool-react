import * as cls from './PageError.module.css';

const reloadPage = () => {
  window.location.reload();
};

function PageError() {
  return (
    <div className={cls.PageError}>
      <p className={cls.PageError__message}>Oops! Something went wrong!</p>
      <button onClick={reloadPage} type="button">
        Reload the page
      </button>
    </div>
  );
}

export default PageError;
