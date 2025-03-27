// server.ts
import { createApp } from './app';
import { logger } from './utils/logger';

const port = process.env.PORT || 1487;

createApp().listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at:', ${promise}, 'reason:', ${reason}`);
  process.exit(1);
});
