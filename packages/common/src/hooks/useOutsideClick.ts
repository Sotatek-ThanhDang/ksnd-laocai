import { type RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleOutSideClick = (event: Event) => {
      if (
        event.target instanceof Node &&
        ref?.current &&
        !ref.current.contains(event.target)
      ) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleOutSideClick);
    document.addEventListener('touchstart', handleOutSideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutSideClick);
      document.removeEventListener('touchstart', handleOutSideClick);
    };
  }, []);
};

export default useOutsideClick;
