import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import { useForm } from 'react-hook-form';

import { FormInput, type FormInputProps } from '../components/common/FormInput';
import { normalizeOnlyNumberInput } from '../utils';

const STORY_FIELD_NAME = 'form-input-story-field';
type StoryFormValues = Record<typeof STORY_FIELD_NAME, string>;
type StoryInputProps = Omit<
  FormInputProps<StoryFormValues>,
  'control' | 'name'
>;

const FormInputStory = (props: StoryInputProps) => {
  const form = useForm<StoryFormValues>({
    defaultValues: { [STORY_FIELD_NAME]: '' },
  });

  return (
    <div style={{ maxWidth: 360 }}>
      <FormInput {...props} control={form.control} name={STORY_FIELD_NAME} />
    </div>
  );
};

FormInputStory.displayName = 'FormInput';

const meta = {
  title: 'Forms/Input',
  component: FormInputStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    helperText: {
      control: 'text',
      description: 'Supporting message shown below the input',
    },
    label: {
      control: 'text',
      description: 'The label displayed above the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text rendered when the field is empty',
    },
    required: {
      control: 'boolean',
      description: 'Flags the input as required with an asterisk',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the field for editing',
    },
    formatter: {
      control: 'select',
      options: ['default', 'number', 'currency', 'phone', 'search'],
      description: 'Applies built-in formatting or masks',
    },
    currencyType: {
      control: 'select',
      options: ['VND', 'EUR', 'DOLLAR'],
      description: 'Suffix shown for currency formatter',
    },
    maxLength: {
      control: { type: 'number', min: 0 },
      description: 'Limits how many characters users can enter (0 = unlimited)',
    },
    type: {
      control: 'text',
      description: 'HTML input type (text, password, email, etc.)',
    },
    normalize: { table: { disable: true } },
    onChange: { table: { disable: true } },
    decimal: {
      control: 'boolean',
      description:
        'Applies built-in formatting with formatter type number or currency. Default is true  ',
    },
  },
} satisfies Meta<typeof FormInputStory>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: StoryInputProps) => <FormInputStory {...args} />;

export const Default: Story = {
  args: {
    label: 'Full name',
    placeholder: 'Jane Doe',
    helperText: 'Use your legal name for records',
    required: true,
  },
  render: Template,
};

export const WithNormalize: Story = {
  args: {
    label: 'Amount',
    placeholder: '12',
    normalize: normalizeOnlyNumberInput,
    helperText: 'Only digits are accepted',
  },
  render: Template,
};

export const WithMaxLength: Story = {
  args: {
    label: 'Description',
    placeholder: '',
    maxLength: 50,
    helperText: 'Only enter 50 characters',
  },
  render: Template,
};

export const NumberFormatter: Story = {
  args: {
    label: 'Quantity',
    placeholder: '12',
    formatter: 'number',
    helperText: 'Only digits are accepted',
  },
  render: Template,
};

export const IntegerOnlyFormatter: Story = {
  args: {
    label: 'Quantity',
    placeholder: '12',
    formatter: 'number',
    helperText: 'Only digits are accepted',
    decimal: false,
  },
  render: Template,
};

export const CurrencyFormatter: Story = {
  args: {
    label: 'Total amount',
    placeholder: 'Enter total amount',
    formatter: 'currency',
    currencyType: 'EUR',
    helperText: 'Automatically adds delimiters',
  },
  render: Template,
};

export const PhoneFormatter: Story = {
  args: {
    label: 'Phone number',
    formatter: 'phone',
    placeholder: '000-000-0000',
    helperText: 'Used for quick contact',
  },
  render: Template,
};

export const SearchFormatter: Story = {
  args: {
    label: 'Search',
    formatter: 'search',
    placeholder: 'Search keywords',
    helperText: 'The search icon appears at the start of the field',
  },
  render: Template,
};
