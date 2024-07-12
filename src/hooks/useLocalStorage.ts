import { useEffect } from 'react';
import ls from '../utils/localStorage/localStorage';

const useLocalStorage = <T>({
  key,
  initialValue,
  onSuccess,
}: {
  key: string;
  initialValue: T;
  onSuccess: (val: T) => void;
}) => {
  const { get, set } = ls(key);

  useEffect(() => {
    const getInitialQuery = () => {
      const search = get();

      if (search) {
        onSuccess(search);
        return;
      }

      set(initialValue);
      onSuccess(initialValue);
    };

    getInitialQuery();
  }, []);

  return [set, get];
};

export default useLocalStorage;
