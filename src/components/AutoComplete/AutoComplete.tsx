import { ChangeEventHandler, FocusEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as styles from './AutoComplete.module.css';
import useClickOutside from '../../hooks/useClickOutside';
import useDebounceCall from '../../hooks/useDebounceCall';

type Props = {
  placeholder: string;
  name: string;
  value: string;
  searcher: string;
  list: Array<Record<string, any>>;
  onChange: (val: string) => void;
  onSubmit: (val: string) => void;
};

function AutoComplete({ placeholder, name, searcher, value = '', onChange: onUpdate, onSubmit, list }: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const _value = useMemo(() => value, [value]);

  const [text, setText] = useState(_value || '');
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
    if (!isOpened) setText(_value || '');
  }, [_value, isOpened]);

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
    setCurrentItem(list.find((elem) => elem[searcher] === _value) || null);
  }, [_value]);

  const onItemClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const itemId = (e.target as HTMLButtonElement).value;

      onUpdate(itemId);
    },
    [onUpdate],
  );

  const debouncedInputValue = useDebounceCall(text, 500);

  const filteredList = useMemo(() => {
    return list.filter((elem) => elem.name.includes(debouncedInputValue));
  }, [debouncedInputValue]);

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
            {filteredList.map((item) => (
              <li key={item.name}>
                <button className={styles.ListBtn} value={item.name} onClick={onItemClick} disabled={currentItem?.name === item.name}>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AutoComplete;
