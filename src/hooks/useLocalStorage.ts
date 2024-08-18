import { useEffect } from 'react';
import ls from '../utils/localStorage/localStorage';

const useLocalStorage = <T>({ key, initialValue, onSuccess }: { key: string; initialValue: T; onSuccess: (val: T) => void }) => {
  const { get, set } = ls(key);

  useEffect(() => {
    const getInitialValue = () => {
      const value = get();

      if (value) {
        onSuccess(value);
        return;
      }

      set(initialValue);
      onSuccess(initialValue);
    };

    getInitialValue();
  }, []);

  return [set, get];
};

export default useLocalStorage;
