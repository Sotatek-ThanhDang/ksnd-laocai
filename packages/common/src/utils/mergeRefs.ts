import type { MutableRefObject, Ref, RefCallback } from 'react';

const mergeRefs =
  <T>(...refs: Ref<T>[]): RefCallback<T> =>
  (element: T) =>
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref && typeof ref === 'object') {
        (ref as MutableRefObject<T>).current = element;
      }
    });

export { mergeRefs };
