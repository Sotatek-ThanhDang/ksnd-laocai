import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';

import { FormTextArea } from '../components/common/FormTextArea';

const STORY_FIELD_NAME = 'form-text-area-story-field';
type StoryFormValues = Record<typeof STORY_FIELD_NAME, string>;

type FormTextAreaStoryProps = {
  label?: string;
  helperText?: string;
  maxLength?: number;
  disabled?: boolean;
};

const FormTextAreaStory = ({
  label,
  helperText = 'Max length is controlled automatically',
  maxLength = 120,
  disabled,
}: FormTextAreaStoryProps) => {
  const form = useForm<StoryFormValues>({
    defaultValues: { [STORY_FIELD_NAME]: '' },
  });

  return (
    <div style={{ width: 360 }}>
      <FormTextArea
        control={form.control}
        name={STORY_FIELD_NAME}
        label={label}
        helperText={helperText}
        maxLength={maxLength}
        disabled={disabled}
      />
    </div>
  );
};

FormTextAreaStory.displayName = 'FormTextArea';

const meta = {
  title: 'Forms/Textarea',
  component: FormTextAreaStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label displayed above the textarea',
    },
    helperText: {
      control: 'text',
      description: 'Supporting message shown below the textarea',
    },
    maxLength: {
      control: { type: 'number', min: 0 },
      description: 'Limits how many characters users can enter (0 = unlimited)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the textarea for editing',
    },
  },
  args: {
    label: 'Describe your request',
  },
} satisfies Meta<typeof FormTextAreaStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: FormTextAreaStoryProps) => (
  <FormTextAreaStory {...args} />
);

export const Default: Story = {
  args: {
    helperText: 'Share as many details as you need',
  },
  render: Template,
};

export default meta;
