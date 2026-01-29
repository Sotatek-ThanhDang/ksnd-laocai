import { useEffect, useRef } from 'react';

export function useEnterToSubmit({
  onSubmit,
  disableSumbitOnEnter,
}: {
  onSubmit: () => void;
  disableSumbitOnEnter?: boolean;
}) {
  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const form = ref.current;
    if (!form) return;

    const handler = (e: KeyboardEvent) => {
      const tag =
        e.target instanceof HTMLElement ? e.target.tagName.toLowerCase() : '';

      if ((e.shiftKey && tag === 'textarea') || e.key !== 'Enter') return;

      e.preventDefault();
      e.stopPropagation();

      if (disableSumbitOnEnter) {
        return;
      }

      onSubmit();
    };

    form.addEventListener('keydown', handler, true);

    return () => {
      form.removeEventListener('keydown', handler, true);
    };
  }, [onSubmit, disableSumbitOnEnter]);

  return { ref };
}
