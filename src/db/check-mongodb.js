<<<<<<< HEAD
import { closeMongo, getMongoDatabase } from './mongodb.js';

try {
  const database = await getMongoDatabase();
  await database.command({ ping: 1 });
  console.log(`MongoDB connection successful: ${database.databaseName}`);
} catch (error) {
  console.error(`MongoDB connection failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await closeMongo();
=======
import { closeMongo, getMongoDatabase } from './mongodb.js';

try {
  const database = await getMongoDatabase();
  await database.command({ ping: 1 });
  console.log(`MongoDB connection successful: ${database.databaseName}`);
} catch (error) {
  console.error(`MongoDB connection failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await closeMongo();
>>>>>>> 342fc312a402b959fb2916899ce63f18a9b70772
}