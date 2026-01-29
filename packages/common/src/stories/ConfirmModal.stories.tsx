import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ConfirmModal as CustomConfirmModal } from '../components/common/modal/ConfirmModal';
import { formatNumber } from '../utils';

type ConfirmModalComponentProps = React.ComponentProps<
  typeof CustomConfirmModal
>;

const ConfirmModal = (props: ConfirmModalComponentProps) => (
  <CustomConfirmModal {...props} />
);
ConfirmModal.displayName = 'ConfirmModal';

const meta = {
  title: 'Feedback/Confirm Modal',
  component: ConfirmModal,
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
    description: {
      control: 'text',
      description: 'The description text displayed in the modal',
    },
    fields: {
      control: 'object',
      description: 'Array of fields to display in the confirmation modal',
    },
    onClose: {
      action: 'closed',
      description: 'Callback function when modal is closed',
    },
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const commonConfirmModalProps = {
  open: false,
  onClose: () => {},
  title: 'Are you sure to save this?',
  description: 'This cannot be undo?',
  cancelButton: {
    children: 'Cancel',
  },
  confirmButton: {
    children: 'Confirm',
  },
};

const Template = (modalProps: ConfirmModalComponentProps) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <ConfirmModal {...modalProps} open={open} onClose={handleClose} />
    </>
  );
};

export const WithFieldValue: Story = {
  args: {
    ...commonConfirmModalProps,
    fields: [
      {
        label: 'Name',
        value: 'Thanh',
      },
      { label: 'Age', value: '18' },
      {
        label: 'Amount',
        value: '155340000000',
        formatter: (value) => formatNumber(value),
      },
    ],
  },
  render: (args) => <Template {...args} />,
};

export const WithFormField: Story = {
  args: {
    ...commonConfirmModalProps,
    fields: [
      {
        label: 'Name',
        name: 'name',
      },
      { label: 'Age', name: 'age' },
      {
        label: 'Amount',
        name: 'amount',
        formatter: (value) => formatNumber(value),
      },
    ],
  },
  render(args) {
    const forms = useForm({
      defaultValues: {
        name: 'Thanh',
        age: 20,
        amount: 1_000_000_000,
      },
    });

    return (
      <FormProvider {...forms}>
        <Template {...args} />
      </FormProvider>
    );
  },
};
