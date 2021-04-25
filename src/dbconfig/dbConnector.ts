import dotenv from "dotenv";
import { Pool } from 'pg';

dotenv.config();

export default new Pool({
  max: 20,
  connectionString: `${process.env.DATABASE_URL}`,
  idleTimeoutMillis: 30000
});
