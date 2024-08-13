import Link from 'next/link';
import { Inter } from 'next/font/google';

import * as styles from '../styles/pages/NotFound.module.css';

const inter = Inter({ subsets: ['latin'] });
const theme = 'light';

function NotFound() {
  return (
    <div className={`wrapper ${theme} ${inter.className}`} data-testid="app">
      <div className={styles.NotFound} data-testid="not-found-page">
        <h1>The page is not found</h1>
        <p>Oops, you can go to the home page</p>
        <Link href="/" className="button">
          Go Home!
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
