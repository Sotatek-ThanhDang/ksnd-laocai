import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage({
  path,
  embed,
}: {
  path: string;
  embed?: boolean;
}) {
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
          404
        </Typography>
        <Typography variant="h4" component="h2">
          Page not found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sorry, the page you are looking for does not exist or has been moved.
        </Typography>
        <Button variant="contained" size="large" onClick={() => navigate(path)}>
          Back to home
        </Button>
      </Box>
    </Container>
  );
}
