
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: 'postgres',
    port: '5432',

})

pool.connect((err) => {
    if (err) throw err
    console.log("Connect to PostgreSQL success!")
})

export default pool;