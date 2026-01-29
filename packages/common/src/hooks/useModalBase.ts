import { type MouseEvent, useCallback, useMemo } from 'react';

import { type BaseModalProps } from '../types/modal';

type UseModalBaseLogicProps<TWithForm extends boolean> = Pick<
  BaseModalProps<TWithForm>,
  'onClose' | 'cancelButton' | 'confirmButton' | 'withForm'
> & {
  type: 'dialog' | 'drawer';
};

export function useModalBase<TWithForm extends boolean>({
  onClose,
  cancelButton,
  confirmButton,
  withForm,
  type,
}: UseModalBaseLogicProps<TWithForm>) {
  const formId = useMemo(() => {
    if (!withForm) return undefined;
    return type === 'drawer' ? 'form-drawer-id' : 'form-dialog-id';
  }, [withForm, type]);

  const handleCancelClick = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      await cancelButton?.onClick?.(e);
      if (!cancelButton?.disableCloseOnClick) onClose();
    },
    [cancelButton, onClose]
  );

  const handleConfirmClick = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      await confirmButton?.onClick?.(e);
      if (!confirmButton?.disableCloseOnClick) onClose();
    },
    [confirmButton, onClose]
  );

  return { formId, handleCancelClick, handleConfirmClick };
}
