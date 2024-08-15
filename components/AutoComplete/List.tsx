import { MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as styles from './List.module.css';
import useKeyboardShortcut from '@/hooks/useKeyPress';
import cn from 'classnames';

type Props<TItem extends object> = {
  value: string;
  list: Array<TItem>;
  searcher: keyof TItem;
  onChange: (newValue: string) => void;
  onClose: () => void;
};

function getItem<TItem extends object>(list: Array<TItem>, searcher: keyof TItem, value: string) {
  return list.find((elem) => elem[searcher] === value) || null;
}

export function List<TItem extends object>({ value, list = [], searcher, onChange, onClose }: Props<TItem>) {
  const [currentItem, setCurrentItem] = useState(getItem(list, searcher, value));

  useEffect(() => {
    setCurrentItem(getItem(list, searcher, value));
  }, [value]);

  const onItemClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const item = (e.target as HTMLButtonElement).value;

      setCurrentItem(getItem(list, searcher, item));
      onChange(item);
      onClose();
    },
    [onChange, setCurrentItem, onClose],
  );

  const filteredList = useMemo(() => {
    if (value) {
      return list.filter((elem) => (elem[searcher] as string).includes(value));
    }

    return list;
  }, [value]);

  // hovering

  const [listItemHovered, setListItemHovered] = useState<null | TItem>(null);
  const [currentHoverIndex, setCurrentHoverIndex] = useState(-1);
  const [isMouseOnList, setIsMouseOnList] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  const onHover: MouseEventHandler<HTMLButtonElement> = (event) => {
    const button = event.target as HTMLButtonElement;

    setListItemHovered(getItem(list, searcher, button.value));
    setCurrentHoverIndex(filteredList.findIndex((elem) => elem === listItemHovered));
    setIsMouseOnList(true);
  };

  const onHoverLeave: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = () => {
    setListItemHovered(null);
    setCurrentHoverIndex(-1);
    setIsMouseOnList(false);
  };

  // scroll on keyboard move up & down

  useEffect(() => {
    if (!isMouseOnList && currentHoverIndex >= 0) {
      listRef.current?.scrollTo({ top: currentHoverIndex * 40.69 - 40 });
    }
  }, [isMouseOnList, currentHoverIndex, listItemHovered]);

  // keyboard arrow up

  const onArrowUp = () => {
    if (!isMouseOnList) {
      if (listItemHovered) {
        const currentHoverIndex = filteredList.findIndex((elem) => elem === listItemHovered);

        if (currentHoverIndex - 1 >= 0) {
          setListItemHovered(filteredList[currentHoverIndex - 1]);
          setCurrentHoverIndex(currentHoverIndex - 1);
        }
        return;
      }
    }
  };

  useKeyboardShortcut({
    key: 'ArrowUp',
    onKeyPressed: onArrowUp,
    deps: [listItemHovered, filteredList, currentHoverIndex, setListItemHovered, setCurrentHoverIndex],
  });

  // keyboard arrow down

  const onArrowDown = () => {
    if (!isMouseOnList) {
      if (listItemHovered) {
        const currentHoverIndex = filteredList.findIndex((elem) => elem === listItemHovered);

        if (currentHoverIndex >= 0 && currentHoverIndex + 1 < filteredList.length) {
          setListItemHovered(filteredList[currentHoverIndex + 1]);
          setCurrentHoverIndex(currentHoverIndex + 1);
        }
        return;
      }

      setListItemHovered(filteredList[0]);
    }
  };

  useKeyboardShortcut({
    key: 'ArrowDown',
    onKeyPressed: onArrowDown,
    deps: [listItemHovered, filteredList, currentHoverIndex, setListItemHovered, setCurrentHoverIndex],
  });

  // keyboard enter

  const submitOnEnter = () => {
    if (listItemHovered) {
      onChange(listItemHovered[searcher] as string);
    }
  };

  useKeyboardShortcut({
    key: 'Enter',
    onKeyPressed: submitOnEnter,
    deps: [onChange, listItemHovered, searcher],
  });

  return (
    <div className={styles.List} ref={listRef} onMouseLeave={onHoverLeave}>
      <ul>
        {filteredList.length > 0 ? (
          filteredList.map((item) => {
            const key: string = item[searcher] as string;

            return (
              <li key={key}>
                <button
                  className={cn(styles.ListBtn, { [styles.Hover]: listItemHovered ? listItemHovered[searcher] === key : false })}
                  value={key}
                  onClick={onItemClick}
                  onMouseEnter={onHover}
                  disabled={currentItem ? currentItem[searcher] === key : false}
                  type="button"
                >
                  {key}
                </button>
              </li>
            );
          })
        ) : (
          <li>No matches found</li>
        )}
      </ul>
    </div>
  );
}

export default List;
