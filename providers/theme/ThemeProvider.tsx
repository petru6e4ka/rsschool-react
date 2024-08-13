import {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import { Theme, ThemeContext } from './ThemeContext';
import themeStorage from './themeStorage';

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);

  useEffect(() => {
    const choosenTheme = themeStorage.get() || Theme.DARK;

    setTheme(choosenTheme);
  }, []);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
