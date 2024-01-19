// server.ts
import { createApp } from './app'; // Adjust the path accordingly
import { config } from './config/default';
import { logger } from './utils/logger';

const { port } = config;

createApp().listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at:', ${promise}, 'reason:', ${reason}`);
  process.exit(1);
});
