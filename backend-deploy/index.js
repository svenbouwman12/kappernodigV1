import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import geocodeHandler from './api/geocode.js';
import pingHandler from './api/ping.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/ping', pingHandler);
app.post('/api/geocode', geocodeHandler);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
