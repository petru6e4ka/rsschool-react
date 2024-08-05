import cn from 'classnames';
import { Theme } from '../ThemeContext';
import { useTheme } from '../useTheme';
import * as styles from './ThemeSwitcher.module.css';

function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, changeTheme } = useTheme();

  const setNewTheme = () => {
    changeTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <div className={cn(styles.ThemeSwitcher, className)} data-testid="ThemeSwitcher">
      <label className={styles.Switch} htmlFor="themeSwitcher">
        Switch Theme
        <input className={styles.Input} type="checkbox" id="themeSwitcher" onChange={setNewTheme} />
        <span className={cn(styles.Slider, styles.Round)} />
      </label>
    </div>
  );
}

export default ThemeSwitcher;
