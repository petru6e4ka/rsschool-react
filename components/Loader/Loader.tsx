import * as styles from './Loader.module.css';

function Loader({ className = '' }: { className?: string }) {
  return <span className={`${styles.Loader} ${className}`} data-testid="loader" />;
}

export default Loader;
