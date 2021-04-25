import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://postgres:asdlkjasdlkj@localhost:5432/zap-api',
    idleTimeoutMillis: 30000
});
