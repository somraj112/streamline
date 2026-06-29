import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors());

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// 404 middleware
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Error middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

export default app;