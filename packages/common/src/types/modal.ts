import { type ButtonProps } from '@mui/material/Button';
import { type DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import { type DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import { type ComponentProps, type ReactNode } from 'react';

/**
 * @type ConfirmButtonProps
 * Extends standard ButtonProps to include an option to prevent modal closure on click.
 */
type ConfirmButtonProps = ButtonProps & {
  /** If true, the modal will not automatically close after the confirm button click handler runs. */
  disableCloseOnClick?: boolean;
};

/**
 * @type ConfirmButtonProps
 * Extends standard ButtonProps to include an option to prevent modal closure on click.
 */
type CancelButtonProps = ButtonProps & {
  /** If true, the modal will not automatically close after the confirm button click handler runs. */
  disableCloseOnClick?: boolean;
};

/**
 * @type BaseModalProps
 * Defines the common props shared by both Dialog and Drawer types.
 * @template TWithForm - A boolean to conditionally include form-related props.
 */
type BaseModalProps<TWithForm extends boolean> = {
  /** Function to call when the modal needs to be closed (e.g., clicking outside or pressing close button). */
  onClose: () => void;
  /** Optional title for the modal header. */
  title?: string;
  /** The main content to be displayed inside the modal body. */
  content: ReactNode;
  /** Props for the cancel (outlined) button. */
  cancelButton?: CancelButtonProps;
  /** Props for the confirm (contained) button, including the option to disable closing. */
  confirmButton?: ConfirmButtonProps;
  /** If true, the modal content wrapper will be rendered as a 'form' element. */
  withForm?: TWithForm;
  /** Additional props to pass to the HTML form element when `withForm` is true. */
  formProps?: TWithForm extends true
    ? Omit<ComponentProps<'form'>, 'component' | 'id'>
    : never;
};

/**
 * @type DrawerTypeProps
 * Defines props for the Drawer variant, using Discriminated Union.
 * Combines BaseModalProps with specific MuiDrawerProps (omitting internal/conflicting props).
 * @template TWithForm - Inherits conditional form logic.
 */
type DrawerTypeProps<TWithForm extends boolean> = BaseModalProps<TWithForm> & {
  /** Discriminator property: specifies the component should render as a Drawer. */
  type?: 'drawer';
  icon?: React.ReactNode;
} & Omit<MuiDrawerProps, 'onClose' | 'content' | 'anchor' | 'open'>;

/**
 * @type DialogTypeProps
 * Defines props for the Dialog variant, using Discriminated Union.
 * Combines BaseModalProps with specific MuiDialogProps (omitting internal/conflicting props).
 * @template TWithForm - Inherits conditional form logic.
 */
type DialogTypeProps<TWithForm extends boolean> = BaseModalProps<TWithForm> & {
  /** Discriminator property: specifies the component should render as a Dialog. */
  type?: 'dialog';
} & Omit<MuiDialogProps, 'onClose' | 'content' | 'open'>;

/**
 * @type ModalProps
 * The primary exported type, representing a Discriminated Union of all possible modal configurations.
 * This allows TypeScript to infer the correct restProps based on the `type` property.
 * @template TWithForm - Conditional form logic.
 */
type ModalProps<TWithForm extends boolean = false> =
  | DrawerTypeProps<TWithForm>
  | DialogTypeProps<TWithForm>;

export type {
  BaseModalProps,
  CancelButtonProps,
  ConfirmButtonProps,
  DialogTypeProps,
  DrawerTypeProps,
  ModalProps,
};
