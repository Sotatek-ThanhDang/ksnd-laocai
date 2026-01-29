import { zodResolver } from '@hookform/resolvers/zod';
import { Button as MuiButton, ButtonProps, Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentPropsWithoutRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { fn } from 'storybook/test';
import { z } from 'zod';

import { FormInput } from '../components/common/FormInput';
import { Modal } from '../components/common/modal/Modal';

type ModalStoryProps = ComponentPropsWithoutRef<typeof Modal>;

const Button = (props: ButtonProps) => <MuiButton {...props} />;
Button.displayName = 'Button';

const meta = {
  title: 'Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls the visibility of the modal',
    },
    title: {
      control: 'text',
      description: 'The title of the modal',
    },
    content: {
      control: 'text',
      description: 'The content displayed in the modal',
    },
    onClose: {
      action: 'closed',
      description: 'Callback function when modal is closed',
    },
    type: {
      control: 'select',
      options: ['dialog', 'drawer'],
      description: 'The type of modal to render',
    },
    cancelButton: {
      control: 'object',
      description: 'Props for the cancel (outlined) button',
    },
    confirmButton: {
      control: 'object',
      description:
        'Props for the confirm (contained) button, including the option to disable closing',
    },
    withForm: {
      control: 'boolean',
      description:
        'If true, the modal content wrapper will be rendered as a form element',
    },
    formProps: {
      control: 'object',
      description:
        'Additional props to pass to the HTML form element when withForm is true',
      if: { arg: 'withForm' },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const commonModalProps: ModalStoryProps = {
  open: false,
  title: 'Are you sure to update theses field?',
  content:
    'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.',
  onClose: fn,
  cancelButton: {
    children: 'Cancel',
  },
  confirmButton: {
    children: 'Confirm',
  },
};

const Template = (modalProps: ModalStoryProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const onClose = () => setOpen(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open Dialog
      </Button>

      <Modal {...modalProps} open={open} onClose={onClose} />
    </>
  );
};

export const Default: Story = {
  args: {
    ...commonModalProps,
    type: 'dialog',
  },
  render: Template,
};

export const AsDrawer: Story = {
  args: {
    ...commonModalProps,
    type: 'drawer',
  },
  render: Template,
};

const schema = z.object({
  name: z.string().min(1, 'Required'),
  age: z.coerce.number().min(18, 'Must be 18+'),
});

export const WithFormValidation: Story = {
  args: {
    ...commonModalProps,
    title: 'Enter your information',
    withForm: true,
    confirmButton: {
      ...commonModalProps.confirmButton,
      disableCloseOnClick: true,
      type: 'submit',
    },
  },
  render: WithFormValidationStory,
};

export const AutoCloseOnAsyncSubmit: Story = {
  args: {
    ...commonModalProps,
    title: 'Are you sure to delete this ticket?',
    content: 'This action cannot be undo',
    confirmButton: {
      color: 'error',
      children: 'Delete',
    },
  },
  render: AutoCloseOnAsyncSubmitStory,
};

function WithFormValidationStory(modalProps: ModalStoryProps) {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      age: 0,
    },
  });

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const onSubmit = (_: z.infer<typeof schema>) => {
    alert('Submit');
    onClose();
  };

  const renderContent = () => {
    return (
      <Stack gap={1}>
        <FormInput
          label="Name"
          name="name"
          control={form.control}
          placeholder="Name"
        />
        <FormInput
          label="Age"
          formatter="number"
          name="age"
          control={form.control}
          placeholder="Age"
        />
      </Stack>
    );
  };

  return (
    <>
      <Button onClick={onOpen}>Open Dialog</Button>
      <Modal
        {...modalProps}
        open={open}
        onClose={onClose}
        content={renderContent()}
        formProps={{ onSubmit: form.handleSubmit(onSubmit) }}
      />
    </>
  );
}

function AutoCloseOnAsyncSubmitStory(modalProps: ModalStoryProps) {
  const [open, setOpen] = useState(modalProps.open);
  const [loading, startTransition] = useTransition();

  const onDelete = async () =>
    new Promise<void>((resolve) => {
      startTransition(
        () =>
          new Promise((resolveInner) => {
            setTimeout(() => {
              resolveInner();
              resolve();
            }, 2000);
          })
      );
    });

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open Dialog
      </Button>

      <Modal
        {...modalProps}
        open={open}
        onClose={onClose}
        confirmButton={{
          ...modalProps.confirmButton,
          onClick: onDelete,
          loading,
        }}
      />
    </>
  );
}
