import {
  Box,
  IconButton,
  LinearProgress,
  linearProgressClasses,
  Stack,
  Typography,
} from '@mui/material';
import { t } from 'i18next';

import { formatFileSize } from '../../../utils/formatFileSize';
import { CloseIcon, CSVFileIcon, RefreshIcon } from '../icons';

export enum EUploadStatus {
  UPLOADING = 'UPLOADING',
  UPLOADED = 'UPLOADED',
  FAILED = 'FAILED',
}

export type FileUploadResultProps = {
  file: File;
  fileSize?: number;
  handleCancelClick?: (file: File) => void;
  handleRefreshClick?: (file: File) => void;
  uploadStatus?: EUploadStatus;
  loadingProgress?: number;
};

export function FileUploadResult({
  file,
  fileSize,
  handleCancelClick,
  handleRefreshClick,
  uploadStatus = EUploadStatus.UPLOADING,
  loadingProgress,
}: FileUploadResultProps) {
  const isUploading =
    loadingProgress && uploadStatus === EUploadStatus.UPLOADING;
  const isUploadFailed = uploadStatus === EUploadStatus.FAILED;
  const isUploadSuccess = uploadStatus === EUploadStatus.UPLOADED;

  return (
    <Box
      sx={{
        padding: '0.75rem 1rem',
        borderRadius: '0.5rem',
        backgroundColor: isUploadSuccess
          ? 'success.50'
          : isUploadFailed
            ? 'error.50'
            : 'background.paper',
        border: '1px solid',
        borderColor: isUploadSuccess
          ? 'success.main'
          : isUploadFailed
            ? 'border.error'
            : 'border.secondary',
      }}
    >
      <Stack direction="row" gap={1} alignItems="start">
        <CSVFileIcon
          style={{
            width: '2rem',
            height: '2.375rem',
          }}
        />
        <Stack gap={0.25} flex={1}>
          <Typography variant="body_md" color="text.primary" fontWeight={600}>
            {file.name}
          </Typography>
          {isUploadFailed ? (
            <Typography variant="body_sm" color="text.error" flexGrow={1}>
              {t('userImport.uploadFile.failed')}
            </Typography>
          ) : (
            <Typography variant="body_sm" color="text.quaternary">
              {formatFileSize(fileSize || file.size)}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" gap={1} color="text.quaternary">
          {isUploadFailed && handleRefreshClick && (
            <IconButton
              onClick={() => handleRefreshClick(file)}
              sx={{ height: '1rem', width: '1rem' }}
            >
              <RefreshIcon sx={{ height: '1rem', width: '1rem' }} />
            </IconButton>
          )}
          {!isUploading && handleCancelClick && (
            <IconButton
              onClick={() => handleCancelClick(file)}
              sx={{ height: '1rem', width: '1rem' }}
            >
              <CloseIcon sx={{ height: '1rem', width: '1rem' }} />
            </IconButton>
          )}
        </Stack>
      </Stack>

      {isUploading && (
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Box flexGrow={1}>
            <LinearProgress
              variant="determinate"
              value={loadingProgress}
              sx={() => ({
                height: '0.5rem',
                borderRadius: '0.25rem',
                backgroundColor: 'background.tertiary',
                color: 'primary.main',

                [`& .${linearProgressClasses.bar}`]: {
                  borderRadius: '0.25rem',
                },
              })}
            />
          </Box>
          <Typography
            variant="body_md"
            color="text.tertiary"
            fontWeight={500}
          >{`${Math.round(loadingProgress)}%`}</Typography>
        </Stack>
      )}
    </Box>
  );
}
