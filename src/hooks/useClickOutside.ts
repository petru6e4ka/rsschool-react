import { RefObject, useEffect } from 'react';

export const useClickOutside = <TElement extends HTMLElement, TCallback extends () => void>(ref: RefObject<TElement>, callback: TCallback) => {
  useEffect(() => {
    const listener = (event: TouchEvent | MouseEvent) => {
      if (!ref || !ref.current) {
        return;
      }

      const elem = ref.current;

      if (elem?.contains(event.target as Node)) {
        return;
      }

      callback();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
};

export default useClickOutside;
