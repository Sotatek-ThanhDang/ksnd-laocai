import './index.css';
import '@/utils/i18n.ts';
import '@/utils/axios.ts';
import 'leaflet/dist/leaflet.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  PermissionContextProvider,
  queryClient,
  theme,
  ToastContainer,
} from '@repo/common';
import { QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';

dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <PermissionContextProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <App />
            <ToastContainer />
          </BrowserRouter>
        </LocalizationProvider>
      </PermissionContextProvider>
    </QueryClientProvider>
    <CssBaseline />
  </ThemeProvider>
  // </StrictMode>,
);
