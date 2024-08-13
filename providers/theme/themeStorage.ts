import ls from '../../utils/localStorage/localStorage';
import { LOCAL_STORAGE_THEME_KEY } from './ThemeContext';

const themeStorage = ls(LOCAL_STORAGE_THEME_KEY);

export default themeStorage;
