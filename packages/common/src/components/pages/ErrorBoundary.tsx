import { Box, Button, Container, Typography } from '@mui/material';
import { t } from 'i18next';
import type { ComponentPropsWithoutRef, ErrorInfo, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

type ErrorBoundaryPageProps = {
  error?: Error;
  errorInfo?: ErrorInfo;
  path?: string;
  embed?: boolean;
  resetErrorBoundary?: () => void;
  isDevelopment?: boolean;
};

export function ErrorBoundaryPage({
  error,
  errorInfo,
  path = '/',
  embed,
  resetErrorBoundary,
  isDevelopment = false,
}: ErrorBoundaryPageProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      navigate(path);
    }
  };

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
          500
        </Typography>
        <Typography variant="h4" component="h2">
          {t('common.errorBoundary.title', 'Something went wrong')}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textWrap: 'balance' }}
        >
          {t(
            'common.errorBoundary.description',
            'An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.'
          )}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" size="large" onClick={handleGoBack}>
            {t('common.errorBoundary.action', 'Go back')}
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => window.location.reload()}
          >
            {t('common.errorBoundary.reload', 'Reload page')}
          </Button>
        </Box>
        {isDevelopment && error && (
          <Box
            sx={{
              mt: 4,
              p: 2,
              bgcolor: 'error.50',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'error.200',
              maxWidth: '100%',
              textAlign: 'left',
            }}
          >
            <Typography variant="subtitle2" color="error.main" sx={{ mb: 1 }}>
              Error Details (Development only):
            </Typography>
            <Typography
              variant="body2"
              component="pre"
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {error.toString()}
              {errorInfo?.componentStack &&
                `\n\nComponent Stack:\n${errorInfo.componentStack}`}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export const ErrorBoundaryProvider = ({
  children,
  ...pageProps
}: {
  children: ReactNode;
} & Pick<
  ComponentPropsWithoutRef<typeof ErrorBoundaryPage>,
  'embed' | 'isDevelopment' | 'path'
>) => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorBoundaryPage
          {...pageProps}
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
