import { Button, Stack } from '@mui/material';
import { type ButtonProps } from '@mui/material/Button';
import { type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { type ConfirmButtonProps } from '../../../types/modal';

type ModalActionButtonsProps = {
  formId: string | undefined;
  handleCancelClick: (e: MouseEvent<HTMLButtonElement>) => void;
  handleConfirmClick: (e: MouseEvent<HTMLButtonElement>) => void;
  cancelButton?: ButtonProps;
  confirmButton?: ConfirmButtonProps;
};

export function ModalActionButtons({
  formId,
  handleCancelClick,
  handleConfirmClick,
  cancelButton,
  confirmButton,
}: ModalActionButtonsProps) {
  const { t } = useTranslation();

  return (
    <Stack direction="row" gap={1.5} width="100%">
      <Button
        fullWidth
        variant="outlined"
        color="secondary"
        size="large"
        {...cancelButton}
        onClick={handleCancelClick}
      >
        {cancelButton?.children ?? t('common.cancel')}
      </Button>
      <Button
        fullWidth
        color="primary"
        variant="contained"
        size="large"
        {...confirmButton}
        onClick={handleConfirmClick}
        form={formId}
      >
        {confirmButton?.children ?? t('common.confirm')}
      </Button>
    </Stack>
  );
}
