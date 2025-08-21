import dotenv from 'dotenv';
import { CSVProcessingController } from './controllers/CSVProcessingController';

// Load environment variables
dotenv.config();

async function main(): Promise<void> {
  try {
    console.log('🚀 Starting CSV to JSON processing via CLI...\n');

    const controller = new CSVProcessingController();
    await controller.processCSV();

    console.log('\n✅ CLI processing completed successfully!');
  } catch (error) {
    console.error(
      '❌ CLI processing failed:',
      error instanceof Error ? error.message : String(error)
    );
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

// Run the CLI application
if (require.main === module) {
  main();
}

export { main as cliMain };
