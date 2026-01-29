import { Box, type BoxProps, styled } from '@mui/material';

import { getInitialLang } from '../../libs/react-i18n';

const OFFICE_LIVE_VIEWER_URL = 'https://view.officeapps.live.com/op/embed.aspx';

export const DocumentRenderer = ({
  src,
  type = 'pdf',
  boxProps,
}: {
  src: string;
  type?: 'pdf' | 'powerpoint';
  boxProps?: BoxProps;
}) => {
  if (type === 'pdf') {
    return (
      <Container {...boxProps}>
        <object
          data={src}
          type={'application/pdf'}
          width="100%"
          height="100%"
        ></object>
      </Container>
    );
  }

  if (type === 'powerpoint') {
    const url = new URL(OFFICE_LIVE_VIEWER_URL);

    url.searchParams.set('src', src);
    url.searchParams.set('ui', getInitialLang());

    return (
      <Container {...boxProps}>
        <iframe src={url.href} width="100%" height="100%"></iframe>
      </Container>
    );
  }

  return null;
};

const Container = styled(Box)`
  width: 100%;
  height: 100%;
`;
