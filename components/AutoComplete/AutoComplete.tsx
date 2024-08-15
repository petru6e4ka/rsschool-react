import { useCallback, useMemo, useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import cn from 'classnames';
import { useKeyboardShortcut } from '@/hooks/useKeyPress';
import * as styles from './AutoComplete.module.css';
import Input from './Input';
import List from './List';

type Props<TList extends object> = {
  placeholder: string;
  name: string;
  value: string;
  searcher: keyof TList;
  list: Array<TList>;
  className?: string;
  isDisabled?: boolean;
  onChange: (val: string) => void;
};

function AutoComplete<TList extends object>({
  placeholder,
  name,
  value = '',
  searcher,
  list,
  className,
  isDisabled = false,
  onChange: onUpdate,
}: Props<TList>) {
  const [isOpened, setIsOpened] = useState(false);

  const thisValue = useMemo(() => value, [value]);

  const onChangeHandler = useCallback(
    (newValue: string) => {
      console.log(newValue);
      onUpdate(newValue);
    },
    [onUpdate, searcher],
  );

  const autocompleteRef = useRef<HTMLDivElement>(null);

  const onClickOutside = () => {
    setIsOpened(false);
  };

  useClickOutside<HTMLDivElement, () => void>(autocompleteRef, onClickOutside);

  const closeOnEscape = () => {
    if (isOpened) {
      setIsOpened(false);
      return;
    }

    onChangeHandler('');
  };

  useKeyboardShortcut({ key: 'Escape', onKeyPressed: closeOnEscape, deps: [isOpened, setIsOpened, onUpdate, searcher] });

  return (
    <div className={cn(styles.Autocomplete, className)} ref={autocompleteRef}>
      <Input
        placeholder={placeholder}
        name={name}
        value={thisValue}
        onChange={onChangeHandler}
        onOpen={() => setIsOpened(true)}
        disabled={isDisabled}
        isOpened={isOpened}
      />
      {isOpened && <List value={thisValue} list={list} searcher={searcher} onChange={onChangeHandler} onClose={() => setIsOpened(false)} />}
    </div>
  );
}

export default AutoComplete;
