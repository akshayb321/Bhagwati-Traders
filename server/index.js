import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config, validateEnv } from './config/env.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Validate environment variables on startup
validateEnv();

const app = express();

// Security Headers
app.use(helmet());

// CORS Configuration
const allowedOrigins = [
  config.clientUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://localhost:3000',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || config.nodeEnv === 'development') {
        return callback(null, true);
      }
      return callback(new Error('Blocked by CORS policy for Bhagwati Traders API'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body Parsing Middleware (Restrained size to prevent body flooding)
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: true, limit: '64kb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'Bhagwati Traders Enquiry API',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// Enquiry Routes
app.use('/api/enquiries', enquiryRoutes);

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use(errorHandler);

// Start Server
const server = app.listen(config.port, () => {
  console.log(`🚀 [Bhagwati Traders Backend] Running on http://localhost:${config.port}`);
  console.log(`📡 Environment: ${config.nodeEnv}`);
  console.log(`🏢 Official Business Inbox: ${config.businessEmail}`);
});

export default app;
