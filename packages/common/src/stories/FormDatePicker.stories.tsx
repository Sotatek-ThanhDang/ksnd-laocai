import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Dayjs } from 'dayjs';
import { type ComponentPropsWithoutRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormDatePicker } from '../components/common/FormDatePicker';
import {
  dateValidation,
  dateValidationWithFutureOnly,
  dateValidationWithPastOnly,
} from '../utils/zodValidation';

const STORY_FIELD_NAME = 'form-date-picker-story-field';
type StoryFormValues = Record<typeof STORY_FIELD_NAME, Dayjs | null>;

type FormDatePickerStoryProps = Omit<
  ComponentPropsWithoutRef<typeof FormDatePicker>,
  'control' | 'name'
>;

const FormDatePickerStory = ({
  label = 'Choose a start date',
  placeholder = 'dd/mm/yyyy',
  showIcon = true,
  ...restProps
}: FormDatePickerStoryProps) => {
  const form = useForm<StoryFormValues>({
    defaultValues: { [STORY_FIELD_NAME]: null },
  });

  return (
    <div style={{ width: 320 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormDatePicker
          control={form.control}
          name={STORY_FIELD_NAME}
          label={label}
          placeholder={placeholder}
          showIcon={showIcon}
          {...restProps}
        />
      </LocalizationProvider>
    </div>
  );
};

FormDatePickerStory.displayName = 'FormDatePicker';

const meta = {
  title: 'Forms/Date Picker',
  component: FormDatePickerStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'The label displayed above the date picker',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text rendered when the field is empty',
    },
    showIcon: {
      control: { type: 'boolean' },
      description: 'Show the calendar icon button',
    },
    invalidDateMessage: {
      control: { type: 'text' },
      description: 'Custom error message for invalid date input',
    },
    disablePast: {
      control: { type: 'boolean' },
      description: 'Disable dates in the past',
    },
    disableFuture: {
      control: { type: 'boolean' },
      description: 'Disable dates in the future',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the date picker field',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Make the date picker read-only',
    },
    minDate: {
      control: { type: 'date' },
      description: 'Minimum selectable date',
    },
    maxDate: {
      control: { type: 'date' },
      description: 'Maximum selectable date',
    },
  },
} satisfies Meta<typeof FormDatePickerStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: FormDatePickerStoryProps) => (
  <FormDatePickerStory {...args} />
);

export const Default: Story = {
  args: {
    label: 'Start date',
  },
  render: Template,
};

export const WithoutIcon: Story = {
  args: {
    label: 'Start date',
    showIcon: false,
  },
  render: Template,
};

const WithDateValidationStory = (props: FormDatePickerStoryProps) => {
  const schema = z.object({
    [STORY_FIELD_NAME]: dateValidation,
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { [STORY_FIELD_NAME]: null },
  });

  return (
    <form onSubmit={form.handleSubmit(() => {})} style={{ width: 320 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormDatePicker
          control={form.control}
          name={STORY_FIELD_NAME}
          {...props}
        />
      </LocalizationProvider>
      <Button type="submit">Submit</Button>
    </form>
  );
};

WithDateValidationStory.displayName = 'WithDateValidation';

export const WithDateValidation: Story = {
  render: WithDateValidationStory,
  args: {
    label: 'Date (with validation)',
  },
};

const WithPastOnlyValidationStory = (props: FormDatePickerStoryProps) => {
  const schema = z.object({
    [STORY_FIELD_NAME]: dateValidationWithPastOnly,
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { [STORY_FIELD_NAME]: null },
  });

  return (
    <form onSubmit={form.handleSubmit(() => {})} style={{ width: 320 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormDatePicker
          control={form.control}
          name={STORY_FIELD_NAME}
          {...props}
        />
      </LocalizationProvider>
      <Button type="submit">Submit</Button>
    </form>
  );
};

WithPastOnlyValidationStory.displayName = 'WithPastOnlyValidation';

export const WithPastOnlyValidation: Story = {
  args: {
    label: 'Date (past only)',
    disableFuture: true,
  },
  render: WithPastOnlyValidationStory,
};

const WithFutureOnlyValidationStory = (props: FormDatePickerStoryProps) => {
  const schema = z.object({
    [STORY_FIELD_NAME]: dateValidationWithFutureOnly,
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { [STORY_FIELD_NAME]: null },
  });

  return (
    <form onSubmit={form.handleSubmit(() => {})} style={{ width: 320 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormDatePicker
          control={form.control}
          name={STORY_FIELD_NAME}
          {...props}
        />
      </LocalizationProvider>

      <Button type="submit">Submit</Button>
    </form>
  );
};

WithFutureOnlyValidationStory.displayName = 'WithFutureOnlyValidation';

export const WithFutureOnlyValidation: Story = {
  render: WithFutureOnlyValidationStory,
  args: {
    label: 'Date (future only)',
    disablePast: true,
  },
};

export default meta;
