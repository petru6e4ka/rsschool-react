import {
  ChangeEventHandler, FocusEventHandler, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import * as styles from './AutoComplete.module.css';
import { useClickOutside } from '../../hooks/useClickOutside';
import useDebounceCall from '../../hooks/useDebounceCall';

type Props<TList extends object> = {
  placeholder: string;
  name: string;
  value: string;
  searcher: keyof TList;
  list: Array<TList>;
  onChange: (val: string) => void;
  onSubmit: (val: string) => void;
};

function AutoComplete<TList extends object>({
  placeholder, name, searcher, value = '', onChange: onUpdate, onSubmit, list,
}: Props<TList>) {
  const [isOpened, setIsOpened] = useState(false);
  const savedValue = useMemo(() => value, [value]);

  const [text, setText] = useState(savedValue || '');
  const [currentItem, setCurrentItem] = useState(list.find((elem) => elem[searcher] === value) || null);

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setText(e.target.value);
      onUpdate(e.target.value);
    },
    [onUpdate, setText],
  );

  const onBlurHandler: FocusEventHandler<HTMLInputElement> = () => {
    setTimeout(() => setIsOpened(false), 150);
  };

  const onFocusHandler: FocusEventHandler<HTMLInputElement> = () => {
    setIsOpened(true);
  };

  useEffect(() => {
    if (!isOpened) setText(savedValue || '');
  }, [savedValue, isOpened]);

  const listRef = useRef<HTMLDivElement>(null);

  const onClickOutside = () => {
    setIsOpened(false);
  };

  useClickOutside<HTMLDivElement, () => void>(listRef, onClickOutside);

  const onClear = () => {
    setText('');
    setIsOpened(false);
    onUpdate('');
    onSubmit('');
  };

  useEffect(() => {
    setCurrentItem(list.find((elem) => elem[searcher] === savedValue) || null);
  }, [savedValue]);

  const onItemClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const itemId = (e.target as HTMLButtonElement).value;

      onUpdate(itemId);
    },
    [onUpdate],
  );

  const debouncedInputValue = useDebounceCall(text, 500);

  const filteredList = useMemo(() => list.filter((elem) => (elem[searcher] as string).includes(debouncedInputValue)), [debouncedInputValue]);

  return (
    <div className={styles.Autocomplete}>
      <div className={styles.InputContainer}>
        <input
          value={text}
          type="text"
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={onChangeHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
        <div className={styles.AutocompleteActions}>
          <button className={styles.AutocompleteBtns} type="button" onClick={onClear}>
            Clear
          </button>
          <button className={styles.AutocompleteBtns} type="button" onClick={() => onSubmit(text)}>
            Search
          </button>
        </div>
      </div>
      {isOpened && (
        <div ref={listRef} className={styles.AutocompleteList}>
          <ul>
            {filteredList.length > 0 ? filteredList.map((item) => {
              const key: string = item[searcher] as string;

              return (
                <li key={key}>
                  <button
                    className={styles.ListBtn}
                    value={key}
                    onClick={onItemClick}
                    disabled={currentItem ? currentItem[searcher] === key : false}
                    type="button"
                  >
                    {key}
                  </button>
                </li>
              );
            }) : <li>No matches found</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AutoComplete;
