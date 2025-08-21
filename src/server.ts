import express from 'express';
import multer from 'multer';
import path from 'path';
import { CSVProcessingController } from './controllers/CSVProcessingController';
import { ServiceFactory } from './factories/ServiceFactory';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// API endpoint to upload and process CSV
app.post('/api/upload-csv', upload.single('csvFile'), async (req, res) => {
  let tempFilePath: string | null = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No CSV file uploaded',
        help: 'Make sure to use field name "csvFile" in your form data',
      });
    }

    // Convert buffer to string (this is already in memory, so it's fast)
    const csvContent = req.file.buffer.toString('utf-8');

    // Create a temporary file path with absolute path
    tempFilePath = path.join(process.cwd(), `temp_${Date.now()}.csv`);

    try {
      await fs.writeFile(tempFilePath, csvContent);

      const factory = ServiceFactory.getInstance();
      factory.updateCSVConfig({ filePath: tempFilePath });
      const controller = new CSVProcessingController();

      console.log('Processing CSV...');
      await controller.processCSV();
      const users = await controller.getAllUsers();

      return res.json({
        success: true,
        message: `Successfully processed CSV with ${users.length} users`,
        users: users,
      });
    } catch (processingError) {
      console.error('Error processing CSV:', processingError);
      throw processingError;
    }
  } catch (error) {
    console.error('Error processing CSV:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  } finally {
    if (tempFilePath) {
      fs.unlink(tempFilePath).catch(cleanupError => {
        console.warn('Failed to cleanup temporary file:', cleanupError);
      });
      console.log('Temporary file cleanup initiated');
    }
  }
});

// API endpoint to get all users
app.get('/api/users', async (_req, res) => {
  try {
    const controller = new CSVProcessingController();
    const users = await controller.getAllUsers();

    return res.json({
      success: true,
      count: users.length,
      users: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
});

// Error handling middleware
app.use((error: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', error);

  // Handle multer errors specifically
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      error: 'File too large. Maximum size is 10MB.',
    });
  }

  if (error.message === 'Only CSV files are allowed') {
    return res.status(400).json({
      success: false,
      error: 'Invalid file type. Only CSV files are allowed.',
    });
  }

  return res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
  console.log(`Test with Postman: POST http://localhost:${PORT}/api/upload-csv`);
  console.log(`Use field name "csvFile" in your form data`);
  console.log(`Database URL: ${process.env['DATABASE_URL']}`);
  console.log('--------------------------------');
});

export default app;
