import { Client } from 'pg';
import { config, configDotenv } from 'dotenv';

configDotenv();

const client = new Client({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: 'postgres',
});

async function createDatabase() {
  try {
    await client.connect();

    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname='${process.env.DATABASE_NAME}'`,
    );

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${process.env.DATABASE_NAME}`);
      console.log(`Database '${process.env.DATABASE_NAME}' created`);
    } else {
      console.log(`Database '${process.env.DATABASE_NAME}' already exists`);
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
}

createDatabase();
