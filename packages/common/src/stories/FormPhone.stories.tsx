import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';

import { FormPhone } from '../components/common/FormPhone';

const STORY_FIELD_NAME = 'form-phone-story-field';
type StoryFormValues = Record<typeof STORY_FIELD_NAME, string>;

type FormPhoneStoryProps = {
  label?: string;
  placeholder?: string;
};

const FormPhoneStory = ({
  label = 'Phone number',
  placeholder = '000-000-0000',
}: FormPhoneStoryProps) => {
  const form = useForm<StoryFormValues>({
    defaultValues: { [STORY_FIELD_NAME]: '' },
  });

  return (
    <div style={{ width: 360 }}>
      <FormPhone
        control={form.control}
        name={STORY_FIELD_NAME}
        label={label}
        placeholder={placeholder}
      />
    </div>
  );
};

FormPhoneStory.displayName = 'FormPhone';

const meta = {
  title: 'Forms/Phone Input',
  component: FormPhoneStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label displayed above the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text rendered when the field is empty',
    },
  },
} satisfies Meta<typeof FormPhoneStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: FormPhoneStoryProps) => <FormPhoneStory {...args} />;

export const Default: Story = {
  args: {
    label: 'Phone number',
    placeholder: '000-000-0000',
  },
  render: Template,
};

export default meta;
