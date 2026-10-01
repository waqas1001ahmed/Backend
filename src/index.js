import { createApp } from './app.js';
import { config } from './config.js';
import { closeMongo, getMongoDatabase } from './db/mongodb.js';

async function start() {
  try {
    const database = await getMongoDatabase();
    await database.command({ ping: 1 });
  } catch (error) {
    console.error(`[startup] MongoDB connection failed: ${error.message}`);
    console.error('[startup] The API will not start without a working MongoDB connection.');
    process.exitCode = 1;
    return;
  }

  const app = createApp();
  const server = app.listen(config.port, () => {
    console.log('');
    console.log('  Laboratory Management System - API');
    console.log(`  Environment : ${config.env}`);
    console.log(`  Database    : MongoDB/${config.mongodb.database}`);
    console.log(`  Listening   : http://localhost:${config.port}`);
    console.log(`  Health      : http://localhost:${config.port}/api/health`);
    console.log('');
  });

  function shutdown(signal) {
    console.log(`\n[server] ${signal} received, shutting down...`);
    server.close(async () => {
      await closeMongo();
      process.exit(0);
    });
    setTimeout(async () => { await closeMongo(); process.exit(0); }, 5000).unref();
  }

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

start().catch((error) => {
  console.error(`[startup] ${error.message}`);
  process.exitCode = 1;
});
