import { ReactNode, useMemo, useState } from 'react';
import { Theme, ThemeContext } from './ThemeContext';
import themeStorage from './themeStorage';

const choosenTheme = themeStorage.get() || Theme.DARK;

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(choosenTheme);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
