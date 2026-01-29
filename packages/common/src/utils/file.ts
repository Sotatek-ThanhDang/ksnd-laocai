export function checkFileType(fileName: string, acceptFiles: string): boolean {
  const fileExtension = getExtension(fileName);

  if (!fileExtension) return false;

  return acceptFiles.includes(fileExtension);
}

export function getExtension(fileName: string): string {
  if (!fileName || !fileName.includes('.')) {
    return '';
  }

  return fileName.split('.').pop()?.toLowerCase() || '';
}

export const convertContentTypeToAgreementName = (
  fileName: string,
  contentType: string
) => {
  const ext = contentType.split('/')[1];
  return `${fileName}.${ext}`;
};
