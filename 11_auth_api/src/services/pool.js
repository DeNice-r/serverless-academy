import pg from 'pg';


const pool = new pg.Pool({})  // Driver loads needed variables from .env automatically
export default pool
