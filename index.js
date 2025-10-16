import express from 'express';
import weatherRoute from './routes/weatherRoutes.js';
import morgan from 'morgan';

import { initializeDatabase, cleanupExpiredCache } from './database.js';
import { CACHE_DURATION_MS, CLEANUP_INTERVAL_MS } from './config.js';

const app = express();
app.use(morgan('dev'));
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to our Weather info Service!');
});

app.use('/weather', weatherRoute);

app.listen(PORT, async () => {
  console.log(`Server Running on PORT ${PORT}`);

  await initializeDatabase();
  setInterval(
    () => cleanupExpiredCache(CACHE_DURATION_MS),
    CLEANUP_INTERVAL_MS
  );
  console.log(`Cache cleanup job scheduled to run every hour.`);
});
