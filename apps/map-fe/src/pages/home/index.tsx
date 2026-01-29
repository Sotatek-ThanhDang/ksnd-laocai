import { Grid } from '@mui/material';

import { LeftPanel } from '@/components/pages/home/LeftPannel';
import { MapPanel } from '@/components/pages/home/MapPanel';
import { HomeContextProvider } from '@/context/HomeContextProvider';

export default function Home() {
  return (
    <HomeContextProvider>
      <Grid container width="100%" height="100%">
        <Grid size={3.5} height="100vh">
          <LeftPanel />
        </Grid>
        <Grid size={8.5} height="100vh">
          <MapPanel />
        </Grid>
      </Grid>
    </HomeContextProvider>
  );
}
