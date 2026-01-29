import type { ArgTypes, Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentPropsWithoutRef } from 'react';
import { useForm } from 'react-hook-form';

import { FormRadioGroup } from '../components/common/FormRadioGroup';
import type { Option } from '../types';

const STORY_FIELD_NAME = 'form-radio-group-story-field';
type StoryFormValues = Record<typeof STORY_FIELD_NAME, string>;

const RADIO_OPTIONS: Option<string>[] = [
  { label: 'Monthly cycle', value: 'monthly' },
  { label: 'Quarterly cycle', value: 'quarterly' },
  { label: 'Annual cycle', value: 'annual' },
];

type FormRadioGroupStoryProps = ComponentPropsWithoutRef<typeof FormRadioGroup>;

const FormRadioGroupStory = ({
  label = 'Billing cadence',
  radioGroupProps,
  formControlProps,
  options,
}: FormRadioGroupStoryProps) => {
  const resolvedOptions = options ?? [];
  const form = useForm<StoryFormValues>({
    defaultValues: { [STORY_FIELD_NAME]: String(resolvedOptions?.[0]?.value) },
  });

  return (
    <div style={{ width: 360 }}>
      <FormRadioGroup
        control={form.control}
        name={STORY_FIELD_NAME}
        label={label}
        options={resolvedOptions}
        radioGroupProps={radioGroupProps}
        formControlProps={formControlProps}
      />
    </div>
  );
};

FormRadioGroupStory.displayName = 'FormRadioGroup';

const meta = {
  title: 'Forms/Radio Group',
  component: FormRadioGroupStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Billing cadence',
    options: RADIO_OPTIONS,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label rendered above the radio button group',
    },
    options: {
      control: 'object',
      description: 'Available radio options that users can select',
    },
    formControlProps: {
      control: 'object',
      description: 'Props passed to the wrapping FormControl',
    },
    radioGroupProps: {
      control: 'object',
      description: 'Props forwarded to the internal RadioGroup',
    },
  } as ArgTypes<FormRadioGroupStoryProps>,
} satisfies Meta<typeof FormRadioGroupStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: FormRadioGroupStoryProps) => (
  <FormRadioGroupStory {...args} />
);

export const Default: Story = {
  args: {} as FormRadioGroupStoryProps,
  render: Template,
};

export const HorizontalLayout: Story = {
  args: {
    radioGroupProps: { row: true, sx: { justifyContent: 'space-between' } },
  } as FormRadioGroupStoryProps,
  render: Template,
};

export default meta;
