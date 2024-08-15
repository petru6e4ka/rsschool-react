import useKeyboardShortcut from '@/hooks/useKeyPress';
import { ChangeEventHandler, FocusEventHandler, useCallback, useEffect, useState } from 'react';
import * as styles from './Input.module.css';
import cn from 'classnames';

type Props = {
  placeholder: string;
  name: string;
  value: string;
  onChange: (newValue: string) => void;
  onOpen: () => void;
  disabled: boolean;
  isOpened: boolean;
};

export function Input({ placeholder, name, value, onChange, onOpen, disabled, isOpened }: Props) {
  const [text, setText] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
    onChange(e.target.value);
  };

  const onBlurHandler: FocusEventHandler<HTMLInputElement> = () => {
    setIsFocused(false);
    setText(value);
    onChange(value);
  };

  const onFocusHandler: FocusEventHandler<HTMLInputElement> = () => {
    setIsFocused(true);
    onOpen();
  };

  const submitOnEnter = () => {
    if (isFocused) {
      onChange(text);
    }
  };

  useKeyboardShortcut({
    key: 'Enter',
    onKeyPressed: submitOnEnter,
    deps: [onChange, isFocused],
  });

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <div className={styles.Container}>
      <div className={styles.InputContainer}>
        <input
          type="text"
          value={text}
          placeholder={placeholder}
          onChange={onChangeHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          name={name}
          className={styles.Input}
          disabled={disabled}
          autoComplete="off"
        />
        <button type="button" onClick={onOpen} disabled={disabled}>
          <span className={cn(styles.Arrow, { [styles.Open]: isOpened })}>^</span>
        </button>
      </div>

      <div className={styles.InputActions}>
        <button
          className={styles.InputBtns}
          type="button"
          onClick={() => {
            setText('');
            onChange('');
          }}
        >
          Clear
        </button>
        <button className={styles.InputBtns} type="button" onClick={() => onChange(text)}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Input;
