import { Box, Button, Container, Typography } from '@mui/material';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

type ForbiddenPageProps = {
  path?: string;
  embed?: boolean;
};

export function ForbiddenPage({ path = '/', embed }: ForbiddenPageProps) {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        height: embed ? '100%' : '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 3,
          height: '100%',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{ fontSize: '6rem', fontWeight: 'bold' }}
        >
          403
        </Typography>
        <Typography variant="h4" component="h2">
          {t('common.accessDenied.title', 'Access denied')}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textWrap: 'balance' }}
        >
          {t(
            'common.accessDenied.description',
            `Sorry, you do not have permission to view this page. Contact an
          administrator if you believe this is a mistake.`
          )}
        </Typography>
        <Button variant="contained" size="large" onClick={() => navigate(path)}>
          {t('common.accessDenied.action', 'Back to home')}
        </Button>
      </Box>
    </Container>
  );
}
