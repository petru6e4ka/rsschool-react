'use client';

import { createContext } from 'react';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export type ThemeContextProps = {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextProps>({
  theme: Theme.DARK,
  setTheme: () => null,
});

export const LOCAL_STORAGE_THEME_KEY = 'current-theme';
