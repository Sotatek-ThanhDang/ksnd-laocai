import { Box, Drawer, IconButton, Stack, Typography } from '@mui/material';

import { useModalBase } from '../../../hooks/useModalBase';
import type { DrawerTypeProps } from '../../../types/modal';
import { CloseIcon } from '../icons';
import { ModalActionButtons } from './ModalActionButtons';

type DrawerRendererProps<TWithForm extends boolean> = Omit<
  DrawerTypeProps<TWithForm>,
  'type'
> & { open: boolean };

export function DrawerRenderer<TWithForm extends boolean>({
  open,
  title,
  onClose,
  content,
  cancelButton,
  confirmButton,
  withForm,
  formProps,
  icon,
  ...drawerProps
}: DrawerRendererProps<TWithForm>) {
  const { formId, handleCancelClick, handleConfirmClick } = useModalBase({
    onClose,
    cancelButton,
    confirmButton,
    withForm,
    type: 'drawer',
  });

  const renderHeader = () => (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {icon}
        <Typography
          variant="h7"
          fontWeight="bold"
          sx={{ whiteSpace: 'pre-wrap' }}
        >
          {title}
        </Typography>
      </Box>
      <IconButton
        onClick={onClose}
        disableRipple
        disableFocusRipple
        disableTouchRipple
      >
        <CloseIcon sx={{ fontSize: '1.25rem' }} />
      </IconButton>
    </Stack>
  );

  return (
    <Drawer
      {...drawerProps}
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 390,
          height: (theme) => `calc(100% - ${theme.spacing(4)})`,
          translate: (theme) =>
            `-${theme.spacing(2)} ${theme.spacing(2)} !important`,
          borderRadius: '1rem',
          ...drawerProps.sx,
        },
      }}
    >
      <Stack
        height="100%"
        // overflow="hidden"
        component={withForm ? 'form' : 'div'}
        id={formId}
        gap={1.5}
        {...formProps}
      >
        <Box px={3} pt={3}>
          {renderHeader()}
        </Box>
        <Box
          flex={1}
          overflow="auto"
          px={3}
          sx={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {content}
        </Box>
        <Box px={3} pb={3}>
          <ModalActionButtons
            formId={formId}
            handleCancelClick={handleCancelClick}
            handleConfirmClick={handleConfirmClick}
            cancelButton={cancelButton}
            confirmButton={confirmButton}
          />
        </Box>
      </Stack>
    </Drawer>
  );
}
