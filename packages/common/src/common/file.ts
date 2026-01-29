const KB = 1024;
const MB = Math.pow(KB, 2);
const GB = Math.pow(KB, 3);

const DEFAULT_FILE_COUNT = 1;
const DEFAULT_FILE_SIZE_LIMIT = 5 * MB;

const ACCEPTED_FILE_TYPES = {
  IMAGE_ONLY: 'image/*',
  PNG_JPEG: '.png,.jpeg,image/png,image/jpeg',
  PDF_AND_WORD:
    '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  EXCEL:
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
  CSV_AND_EXCEL:
    '.csv, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  PDF_DOCX_EXCEL:
    '.pdf,.doc,.docx,.xlsx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
} as const;

export {
  ACCEPTED_FILE_TYPES,
  DEFAULT_FILE_COUNT,
  DEFAULT_FILE_SIZE_LIMIT,
  GB,
  KB,
  MB,
};
