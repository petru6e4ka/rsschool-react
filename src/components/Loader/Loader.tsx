import * as cls from './Loader.module.css';

function Loader({ className = '' }: { className?: string }) {
  return <span className={`${cls.Loader} ${className}`} data-testid="loader" />;
}

export default Loader;
