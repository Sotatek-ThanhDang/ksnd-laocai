import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';

import { FormOtpInput } from '../components/common/FormOtpInput';

const STORY_FIELD_NAME = 'form-otp-story-field';
type StoryFormValues = Record<typeof STORY_FIELD_NAME, string>;

type FormOtpInputStoryProps = {
  length?: number;
};

const FormOtpInputStory = ({ length = 6 }: FormOtpInputStoryProps) => {
  const form = useForm<StoryFormValues>({
    defaultValues: { [STORY_FIELD_NAME]: '' },
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: 360 }}>
      <FormOtpInput
        control={form.control}
        name={STORY_FIELD_NAME}
        length={length}
      />
    </div>
  );
};

FormOtpInputStory.displayName = 'FormOtpInput';

const meta = {
  title: 'Forms/OTP Input',
  component: FormOtpInputStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    length: 6,
  },
  argTypes: {
    length: { control: { type: 'number', min: 4, max: 8 } },
  },
} satisfies Meta<typeof FormOtpInputStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: FormOtpInputStoryProps) => (
  <FormOtpInputStory {...args} />
);

export const Default: Story = {
  render: Template,
};

export default meta;
