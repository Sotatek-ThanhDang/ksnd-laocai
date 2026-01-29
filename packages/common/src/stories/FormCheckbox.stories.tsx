import type { ArgTypes, Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';
import { useForm } from 'react-hook-form';

import { FormCheckbox as CustomCheckbox } from '../components/common/FormCheckbox';
import type { Option } from '../types/common';

const CHECKBOX_OPTIONS: Option<string>[] = [
  { label: 'Email updates', value: 'email' },
  { label: 'SMS alerts', value: 'sms' },
  { label: 'Product news', value: 'product_news' },
];

type FormCheckboxStoryProps = Partial<
  Omit<ComponentProps<typeof CustomCheckbox>, 'onChange'>
>;

const SingleCheckboxStory = ({
  label = 'Accept terms and conditions',
}: FormCheckboxStoryProps) => {
  const form = useForm<{ consent: boolean }>({
    defaultValues: { consent: false },
  });

  return (
    <div style={{ width: 360 }}>
      <CustomCheckbox control={form.control} name="consent" label={label} />
    </div>
  );
};

const FormCheckbox = ({
  ...props
}: FormCheckboxStoryProps & {
  options?: Option[];
}) => {
  const form = useForm<{ channels: string[] }>({
    defaultValues: { channels: [] },
  });

  return (
    <div style={{ width: 360 }}>
      <CustomCheckbox
        {...props}
        options={props.options ?? []}
        control={form.control}
        name="channels"
        type="checkbox-group"
        label="Notification channels"
      />
    </div>
  );
};

SingleCheckboxStory.displayName = 'FormCheckbox (single)';

const meta = {
  title: 'Forms/Checkbox',
  component: SingleCheckboxStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label rendered next to the standalone checkbox',
    },
    type: {
      control: 'select',
      options: ['checkbox', 'checkbox-group'],
      description: 'Option for checkbox or checkbox group',
    },
    allOptions: {
      control: 'boolean',
      description: 'Enable All option for the field',
    },
    options: {
      control: 'object',
      description: 'Available checkbox options that users can select',
    },
  } as ArgTypes<FormCheckboxStoryProps>,
} satisfies Meta<typeof SingleCheckboxStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: { label?: string }) => (
  <SingleCheckboxStory {...args} />
);

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
  render: Template,
};

export const Group: Story = {
  argTypes: {
    allOptions: {
      control: 'boolean',
      description: 'Enable All option for the field',
    },
  } as ArgTypes<FormCheckboxStoryProps>,
  args: {
    allOptions: true,
    options: CHECKBOX_OPTIONS,
  } as FormCheckboxStoryProps,
  render: (arg) => <FormCheckbox {...arg} />,
};

export default meta;
