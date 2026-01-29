import { type ModalProps } from '../../../types/modal'; // Import từ types.ts
import { DialogRenderer } from './DialogRenderer';
import { DrawerRenderer } from './DrawerRenderer';

export function Modal<TWithForm extends boolean = false>({
  type = 'dialog',
  ...props
}: ModalProps<TWithForm> & { open: boolean }) {
  if (type === 'drawer') {
    return <DrawerRenderer {...props} />;
  }

  if (type === 'dialog') {
    return <DialogRenderer {...props} />;
  }

  return null;
}
