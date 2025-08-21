import dotenv from 'dotenv';
import { CSVProcessingController } from './controllers/CSVProcessingController';

// Load environment variables
dotenv.config();

async function main(): Promise<void> {
  try {
    const controller = new CSVProcessingController();
    await controller.processCSV();
  } catch (error) {
    console.error('Application failed:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Run the application
if (require.main === module) {
  main();
}

export { main };
