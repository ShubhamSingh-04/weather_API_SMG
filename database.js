import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

// This function connects to the DB and sets up the cache table
export async function initializeDatabase() {
  db = await open({
    filename: './cache.db', // This file will be created if it doesn't exist
    driver: sqlite3.Database,
  });

  // Create the cache table if it doesn't already exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS weather_cache (
      city TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      timestamp INTEGER NOT NULL
    )
  `);

  console.log('Database initialized and cache table is ready.');
}

// Function to get a cached record
export async function getCache(city) {
  try {
    const result = await db.get(
      'SELECT * FROM weather_cache WHERE city = ?',
      city
    );
    // The data is stored as a string, so we need to parse it back into an object
    return result ? { ...result, data: JSON.parse(result.data) } : null;
  } catch (error) {
    console.error('Failed to get cache for city:', city, error);
    return null;
  }
}

// Function to save a record to the cache (Insert or Update)
export async function setCache(city, data) {
  const dataString = JSON.stringify(data); // SQLite stores text, so we stringify the object
  await db.run(
    'INSERT INTO weather_cache (city, data, timestamp) VALUES (?, ?, ?) ON CONFLICT(city) DO UPDATE SET data = excluded.data, timestamp = excluded.timestamp',
    [city, dataString, Date.now()]
  );
}

export async function cleanupExpiredCache(cacheDurationMs) {
  const cutoffTime = Date.now() - cacheDurationMs;

  // Delete all records where the timestamp is older than the cutoff time
  const result = await db.run(
    'DELETE FROM weather_cache WHERE timestamp < ?',
    cutoffTime
  );

  if (result.changes > 0) {
    console.log(`Cleaned up ${result.changes} expired cache entries.`);
  }
}
