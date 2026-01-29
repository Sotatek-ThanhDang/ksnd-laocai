import { Box, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMemo } from 'react';

import { useModalBase } from '../../../hooks/useModalBase';
import type { DialogTypeProps } from '../../../types/modal';
import { CloseIcon } from '../icons';
import { ModalActionButtons } from './ModalActionButtons';

type DialogRendererProps<TWithForm extends boolean> = Omit<
  DialogTypeProps<TWithForm>,
  'type'
> & { open: boolean };

export function DialogRenderer<TWithForm extends boolean>({
  open,
  title,
  onClose,
  content,
  cancelButton,
  confirmButton,
  withForm,
  formProps,
  ...dialogProps
}: DialogRendererProps<TWithForm>) {
  const { formId, handleCancelClick, handleConfirmClick } = useModalBase({
    onClose,
    cancelButton,
    confirmButton,
    withForm,
    type: 'dialog',
  });

  const dialogContent = useMemo(() => {
    if (typeof content === 'string')
      return (
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      );
    return content;
  }, [content]);

  return (
    <Dialog
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={open}
      onClose={onClose}
      {...dialogProps}
    >
      {title && (
        <DialogTitle id="alert-dialog-title" sx={{ whiteSpace: 'pre-wrap' }}>
          {title}
        </DialogTitle>
      )}

      <IconButton
        sx={{ position: 'absolute', top: 0, right: 0 }}
        onClick={onClose}
        disableRipple
        disableFocusRipple
        disableTouchRipple
      >
        <CloseIcon sx={{ fontSize: '1.25rem' }} />
      </IconButton>

      <DialogContent
        sx={{
          ...(typeof content === 'string' && {
            color: 'text.quaternary',
            textAlign: 'center',
          }),
          whiteSpace: 'pre-wrap',
        }}
      >
        <Box
          width="100%"
          component={withForm ? 'form' : 'div'}
          id={formId}
          {...formProps}
        >
          {dialogContent}
        </Box>
      </DialogContent>
      <DialogActions>
        <ModalActionButtons
          formId={formId}
          handleCancelClick={handleCancelClick}
          handleConfirmClick={handleConfirmClick}
          cancelButton={cancelButton}
          confirmButton={confirmButton}
        />
      </DialogActions>
    </Dialog>
  );
}
