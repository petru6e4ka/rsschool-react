import { useEffect } from 'react';

type Arguments<TFunc> = {
  key: string;
  onKeyPressed: (e: KeyboardEvent) => void;
  deps?: Array<TFunc>;
};

export function useKeyboardShortcut<TFunc>({ key, onKeyPressed, deps = [] }: Arguments<TFunc>) {
  useEffect(() => {
    function keyDownHandler(e: globalThis.KeyboardEvent) {
      if (e.key === key) {
        e.preventDefault();
        onKeyPressed(e);
      }
    }

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [...deps]);
}

export default useKeyboardShortcut;
