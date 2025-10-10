import "dotenv/config";
import { Pool } from "pg";


//A connection URI is just a special string 
// format that packs all the database connection details 
// (host, user, password, port, database name) into one line 
// instead of setting them individually.
//It looks like a URL, but it’s not for a website 
// — it’s for your database driver.

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default pool;