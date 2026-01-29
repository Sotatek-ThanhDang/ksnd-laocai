import { apis } from '@repo/common';

import { env } from '@/data/env';

apis.defaults.baseURL = env.VITE_BASE_URL;
