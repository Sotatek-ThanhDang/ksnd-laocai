import { Box, Chip, Container, Stack, styled, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import { KB, MB } from '../common/file';
import { ToastContainer } from '../components';
import { FileInput } from '../components/common/uploadFile/FileInput';
import type { FileUploadResultProps } from '../components/common/uploadFile/FileUploadResult';
import { FormFileInput } from '../components/common/uploadFile/FormFileInput';
import { formatFileSize } from '../utils/formatFileSize';

type FileInputStoryProps = {
  maxSize?: number;
  maxCount?: number;
  accept?: string;
};

const FileInputStory = ({ maxSize, maxCount, accept }: FileInputStoryProps) => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Provider>
      <FileInput
        maxSize={maxSize}
        maxCount={maxCount}
        accept={accept}
        value={files}
        onChange={setFiles}
      />
    </Provider>
  );
};

FileInputStory.displayName = 'FileInput';

const meta = {
  title: 'Forms/File Input',
  component: FileInputStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    maxSize: 5 * MB,
    maxCount: 1,
    accept: '.csv,.xlsx,.xls',
  },
  argTypes: {
    maxSize: {
      control: { type: 'number' },
      description: 'Maximum file size in bytes',
    },
    maxCount: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum number of files allowed',
    },
    accept: {
      control: { type: 'text' },
      description: 'Accepted file types (e.g., .csv,.xlsx)',
    },
  },
} satisfies Meta<typeof FileInputStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: FileInputStoryProps) => <FileInputStory {...args} />;

export const Default: Story = {
  render: Template,
};

export const MultipleFiles: Story = {
  args: {
    maxCount: 5,
  },
  render: Template,
};

export const CustomAccept: Story = {
  args: {
    accept: '.pdf,.doc,.docx',
  },
  render: Template,
};

export const CustomMaxSize: Story = {
  args: {
    maxSize: 30 * KB, // 30KB
  },
  render: Template,
};

const WithCustomRenderFileResultStory = (args: FileInputStoryProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const customRenderFileResult = (baseProps: FileUploadResultProps) => {
    const { file, handleCancelClick } = baseProps;
    return (
      <Box
        sx={{
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'border.secondary',
        }}
      >
        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack gap={0.5} flex={1}>
            <Typography variant="body_md" color="text.primary" fontWeight={600}>
              {file.name}
            </Typography>
            <Stack direction="row" gap={1} alignItems="center">
              <Typography variant="body_sm" color="text.quaternary">
                {formatFileSize(file.size)}
              </Typography>
              <Chip
                label={file.type || 'Unknown'}
                size="small"
                variant="outlined"
              />
            </Stack>
          </Stack>
          {handleCancelClick && (
            <Typography
              variant="body_sm"
              color="error.main"
              sx={{ cursor: 'pointer' }}
              onClick={() => handleCancelClick(file)}
            >
              Remove
            </Typography>
          )}
        </Stack>
      </Box>
    );
  };

  return (
    <Provider>
      <FileInput
        {...args}
        value={files}
        onChange={setFiles}
        renderFileResult={customRenderFileResult}
      />
    </Provider>
  );
};

WithCustomRenderFileResultStory.displayName = 'WithCustomRenderFileResult';

export const WithCustomRenderFileResult: Story = {
  args: {
    maxCount: 3,
  },
  render: WithCustomRenderFileResultStory,
};

const STORY_FIELD_NAME = 'form-file-input-story-field';
type StoryFormValues = Record<typeof STORY_FIELD_NAME, File[]>;

const WithFormStory = (args: FileInputStoryProps) => {
  const form = useForm<StoryFormValues>({
    defaultValues: { [STORY_FIELD_NAME]: [] },
  });

  return (
    <Provider>
      <FormFileInput {...args} name={STORY_FIELD_NAME} control={form.control} />
    </Provider>
  );
};

WithFormStory.displayName = 'WithForm';

export const WithForm: Story = {
  args: {
    maxCount: 1,
  },
  render: WithFormStory,
};

const StyledContainer = styled(Container)`
  height: 500px;
  display: flex;
  align-items: center;
`;

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <StyledContainer maxWidth="lg">
      {children}
      <ToastContainer />
    </StyledContainer>
  );
};
export default meta;
