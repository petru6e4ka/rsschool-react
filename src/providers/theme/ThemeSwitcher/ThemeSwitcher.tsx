import { Theme } from '../ThemeContext';
import { useTheme } from '../useTheme';
import * as cls from './ThemeSwitcher.module.css';

function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, changeTheme } = useTheme();

  const setNewTheme = () => {
    changeTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <div className={`${cls.ThemeSwitcher} ${className}`} data-testid="ThemeSwitcher">
      <label className={cls.Switch} htmlFor="themeSwitcher">
        Switch Theme
        <input className={cls.Input} type="checkbox" id="themeSwitcher" onChange={setNewTheme} />
        <span className={`${cls.Slider} ${cls.Round}`} />
      </label>
    </div>
  );
}

export default ThemeSwitcher;
