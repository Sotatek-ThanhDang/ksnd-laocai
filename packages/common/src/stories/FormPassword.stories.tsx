import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentPropsWithoutRef } from 'react';
import { useForm } from 'react-hook-form';

import { FormPassword } from '../components/common/FormPassword';

const STORY_FIELD_NAME = 'form-password-story-field';
type StoryFormValues = Record<typeof STORY_FIELD_NAME, string>;

type FormPasswordStoryProps = Partial<
  ComponentPropsWithoutRef<typeof FormPassword>
>;

const FormPasswordStory = ({
  label = 'Password',
  placeholder = 'Enter password',
  helperText,
  ...rest
}: FormPasswordStoryProps) => {
  const form = useForm<StoryFormValues>({
    defaultValues: { [STORY_FIELD_NAME]: '' },
  });

  return (
    <div style={{ width: 360 }}>
      <FormPassword
        {...rest}
        control={form.control}
        name={STORY_FIELD_NAME}
        label={label}
        placeholder={placeholder}
        helperText={helperText}
      />
    </div>
  );
};

FormPasswordStory.displayName = 'FormPassword';

const meta = {
  title: 'Forms/Password Input',
  component: FormPasswordStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label shown above the password field',
    },
    helperText: {
      control: 'text',
      description: 'Supporting hint shown below the field',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the field for editing',
    },
  },
} satisfies Meta<typeof FormPasswordStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: FormPasswordStoryProps) => (
  <FormPasswordStory {...args} />
);

export const Default: Story = {
  args: {
    helperText: 'At least 8 characters',
  },
  render: Template,
};

export default meta;
