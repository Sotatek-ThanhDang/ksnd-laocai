import { MenuItem, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentPropsWithoutRef } from 'react';
import { useForm } from 'react-hook-form';

import { FormSelect } from '../components/common/FormSelect';
import type { Option } from '../types/common';

const STORY_FIELD_NAME = 'form-select-story-field';
type StoryFormValues = Record<typeof STORY_FIELD_NAME, string | string[]>;

const FORM_SELECT_OPTIONS: Option<string>[] = [
  { label: 'Monthly billing', value: 'monthly' },
  { label: 'Quarterly billing', value: 'quarterly' },
  { label: 'Yearly billing', value: 'yearly' },
  { label: 'Custom billing', value: 'custom' },
];

type FormSelectStoryProps = Partial<
  Omit<ComponentPropsWithoutRef<typeof FormSelect>, 'control' | 'name'>
>;

type DetailedOption = Option<string> & {
  description: string;
};

const FORM_SELECT_CUSTOM_OPTIONS: DetailedOption[] = [
  {
    label: 'Monthly billing',
    value: 'monthly',
    description: 'Automatic monthly charge, cancel anytime',
  },
  {
    label: 'Quarterly billing',
    value: 'quarterly',
    description: 'Save 5% by paying every three months',
  },
  {
    label: 'Yearly billing',
    value: 'yearly',
    description: 'Best value with 12 months upfront',
  },
];

const renderCustomOption: FormSelectStoryProps['renderOption'] = (option) => {
  const detailedOption = option as DetailedOption;

  return (
    <MenuItem
      key={option.value}
      value={option.value}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 0.5,
        py: 1,
        px: 1.5,
      }}
    >
      <Typography variant="body2" fontWeight={500}>
        {option.label}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {detailedOption.description}
      </Typography>
    </MenuItem>
  );
};

const FormSelectStory = ({
  label = 'Billing period',
  multiple,
  allOptions,
  required,
  ...restProps
}: FormSelectStoryProps) => {
  const defaultValue = multiple ? [] : '';
  const form = useForm<StoryFormValues>({
    defaultValues: { [STORY_FIELD_NAME]: defaultValue },
  });

  return (
    <div style={{ width: 360 }}>
      <FormSelect
        {...restProps}
        options={restProps.options ?? []}
        control={form.control}
        name={STORY_FIELD_NAME}
        label={label}
        multiple={multiple}
        allOptions={allOptions}
        required={required}
      />
    </div>
  );
};

FormSelectStory.displayName = 'FormSelect';

const meta = {
  title: 'Forms/Select',
  component: FormSelectStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    options: FORM_SELECT_OPTIONS,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label rendered above the select field',
    },
    options: {
      control: 'object',
      description: 'Options available for selection',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow picking multiple options simultaneously',
    },
    allOptions: {
      control: 'boolean',
      description: 'Show an "All" toggle for multi-selects',
    },
    required: {
      control: 'boolean',
      description: 'Mark the field as required (displays indicator)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select for user interaction',
    },
    placeholder: {
      control: 'text',
      description: 'Text shown when no value is selected',
    },
    withSearch: {
      control: 'object',
      description:
        'Enables a search input at the top of the dropdown (TextFieldProps)',
    },
    renderOption: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
} satisfies Meta<typeof FormSelectStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: FormSelectStoryProps) => <FormSelectStory {...args} />;

export const Default: Story = {
  args: {
    label: 'Billing period',
    required: true,
  },
  render: Template,
};

export const MultipleSelection: Story = {
  args: {
    label: 'Available perks',
    multiple: true,
    allOptions: true,
  },
  render: Template,
};

export const CustomOptionRendering: Story = {
  args: {
    label: 'Billing tiers',
    options: FORM_SELECT_CUSTOM_OPTIONS,
    renderOption: renderCustomOption,
  },
  render: Template,
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Billing period',
    placeholder: 'Select a billing period',
  },
  render: Template,
};

export const WithSearch: Story = {
  args: {
    label: 'Billing period',
    placeholder: 'Select a billing period',
    withSearch: {
      placeholder: 'Search billing options',
    },
  },
  render: Template,
};

export default meta;
