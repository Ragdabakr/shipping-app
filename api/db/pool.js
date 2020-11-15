import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = { connectionString: process.env.DATABASE_URL , max: 20,
  idleTimeoutMillis: 300,
  connectionTimeoutMillis: 200, };
const pool = new Pool(databaseConfig);


pool.on('connect', () => {
  console.log('connected to the db');
});

pool.on('remove', () => {
  console.log('client removed');
  //process.exit(0);
});

export default pool;
