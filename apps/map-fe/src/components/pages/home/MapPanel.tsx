import { Box } from '@mui/material';

import { DetailContainer } from './DetailContainer';
import { MapContainer } from './MapContainer';

export const MapPanel = () => {
  return (
    <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
      <MapContainer />
      <DetailContainer />
    </Box>
  );
};
