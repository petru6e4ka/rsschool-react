import { Inter } from 'next/font/google';
import Link from 'next/link';
import * as styles from '../styles/pages/NotFound.module.css';

const inter = Inter({ subsets: ['latin'] });
const theme = 'light';

function ServerError() {
  return (
    <div className={`wrapper ${theme} ${inter.className}`} data-testid="app">
      <div className={styles.NotFound} data-testid="server-error-page">
        <h1>Something went wrong</h1>
        <p>Oops, you can go to the home page</p>
        <Link href="/" className="button">
          Go Home!
        </Link>
      </div>
    </div>
  );
}

export default ServerError;
