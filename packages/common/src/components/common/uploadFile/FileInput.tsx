import { Stack, Typography } from '@mui/material';
import React, {
  type ChangeEvent,
  type DragEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import {
  ACCEPTED_FILE_TYPES,
  DEFAULT_FILE_COUNT,
  DEFAULT_FILE_SIZE_LIMIT,
} from '../../../common/file';
import { toastError } from '../../../utils';
import { checkFileType } from '../../../utils/file';
import { formatFileSize } from '../../../utils/formatFileSize';
import { UploadCloudIcon } from '../icons';
import {
  FileUploadResult,
  type FileUploadResultProps,
} from './FileUploadResult';

export type FileInputProps = {
  maxSize?: number;
  maxCount?: number | null;
  onMaxSizeExceed?: (file: File) => void;
  accept?: string;
  value?: File[];
  onChange?: (file: File[]) => void;
  renderFileResult?: (baseProps: FileUploadResultProps) => ReactNode;
  disabled?: boolean;
  allowFileTypeText?: string;
};

export function FileInput({
  maxCount = DEFAULT_FILE_COUNT,
  maxSize = DEFAULT_FILE_SIZE_LIMIT, // 5MB
  onMaxSizeExceed,
  accept = ACCEPTED_FILE_TYPES.CSV_AND_EXCEL,
  value,
  onChange,
  renderFileResult,
  disabled,
  allowFileTypeText = 'CSV or XLSX',
}: FileInputProps) {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [fileResults, setFileResults] = useState<File[]>(value ?? []);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const isSingleFile = maxCount === DEFAULT_FILE_COUNT;

  useEffect(() => {
    setFileResults(value ?? []);
  }, [value]);

  const resetInputFile = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const processFiles = useCallback(
    (rawNewFiles: FileList) => {
      const files = isSingleFile ? [] : [...fileResults];

      const newFiles = Array.from(rawNewFiles).filter((file) =>
        checkFileType(file.name, accept)
      );

      for (const file of newFiles) {
        const fileSize = file.size;
        if (maxSize > 0 && fileSize > maxSize) {
          if (onMaxSizeExceed) {
            resetInputFile();
            return onMaxSizeExceed(file);
          } else {
            resetInputFile();

            return toastError(
              `The file size can be up to ${formatFileSize(maxSize)} but your file size is ${formatFileSize(fileSize)}.`
            );
          }
        }

        if (maxCount === null || files.length < maxCount) {
          files.push(file);
        } else {
          break;
        }
      }

      resetInputFile();

      onChange?.(files);
      setFileResults(files);
    },
    [
      isSingleFile,
      fileResults,
      resetInputFile,
      onChange,
      accept,
      maxSize,
      maxCount,
      onMaxSizeExceed,
    ]
  );

  const handleRemoveFile = useCallback(
    (fileToRemove: File) => {
      const updatedFiles = [...fileResults].filter(
        (result) => result !== fileToRemove
      );

      onChange?.(updatedFiles);

      setFileResults(updatedFiles);
    },
    [fileResults, onChange]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLInputElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      processFiles(files);
    },
    [processFiles]
  );

  const handleFileInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        processFiles(files);
      }
    },
    [processFiles]
  );

  const renderDragAndDropZone = () => {
    return (
      <Stack
        component="div"
        p={3}
        gap={1.5}
        border="1px dashed"
        borderColor="divider"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        sx={{
          backgroundColor: disabled
            ? (theme) => theme.palette.background.secondary
            : 'background.paper',
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'border-color 0.2s',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover',
          },
          '& > *': {
            transform: isDragging ? 'translateY(-5px)' : 'none',
            transition: 'transform 0.4s',
          },
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        <UploadCloudIcon
          sx={{ height: '1.75rem', width: '1.75rem', color: '#5E5C5C' }}
        />
        <Stack gap={0.5}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={0.5}
          >
            <Typography variant="body_md" color="text.brand" fontWeight={600}>
              {t('userImport.cta.button', 'Click to upload')}
            </Typography>
            <Typography variant="body_md" color="text.primary">
              {t('userImport.cta.guide', 'or drag and drop')}
            </Typography>
          </Stack>
          <Typography variant="body_md" color="text.quaternary">
            {t(
              'common.uploadFile.note',
              '{{allowFileTypeText}} (max. {{max}})',
              {
                max: formatFileSize(maxSize),
                allowFileTypeText,
              }
            )}
          </Typography>
        </Stack>
        <input
          type="file"
          multiple={maxCount === 1 ? false : true}
          accept={accept}
          onChange={handleFileInputChange}
          hidden
          ref={fileInputRef}
        />
      </Stack>
    );
  };

  const renderFileResultZone = () => {
    if (!fileResults || fileResults.length === 0) return null;
    return (
      <Stack gap={1} mt={1.5}>
        {fileResults.map((file) => {
          const baseProps: FileUploadResultProps = {
            file,
            handleCancelClick: handleRemoveFile,
          };

          if (renderFileResult) {
            return renderFileResult(baseProps);
          }

          return <FileUploadResult key={file.name} {...baseProps} />;
        })}
      </Stack>
    );
  };

  return (
    <Stack
      gap={0}
      width="100%"
      sx={{
        cursor: disabled ? 'not-allowed' : 'auto',
        '& > *': {
          pointerEvents: disabled ? 'none' : 'all',
        },
      }}
    >
      {renderDragAndDropZone()}
      {renderFileResultZone()}
    </Stack>
  );
}
