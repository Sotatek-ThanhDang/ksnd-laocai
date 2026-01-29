import type { TypographyProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import DOMPurify from 'dompurify';
import type { FC } from 'react';

export const SanitizedHTML: FC<
  { htmlString: string; ignoreSanitize?: boolean } & Omit<
    TypographyProps,
    'dangerouslySetInnerHTML'
  >
> = ({ htmlString, ignoreSanitize = false, ...typographyProps }) => {
  return (
    <Typography
      variant="body1"
      component="div"
      dangerouslySetInnerHTML={{
        __html: ignoreSanitize ? htmlString : DOMPurify.sanitize(htmlString),
      }}
      {...typographyProps}
    />
  );
};
