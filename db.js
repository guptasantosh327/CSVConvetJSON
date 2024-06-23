const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    age INT NOT NULL,
    address JSONB NULL,
    additional_info JSONB NULL
);
`;

exports.createTable = async () => {
    await pool.query(createTableQuery);
}

exports.insertData = async (users) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        for (const user of users) {
            const { name, age, address, ...additionalInfo } = user;
            const fullName = `${name.firstName} ${name.lastName}`;
            await client.query(
                'INSERT INTO users (name, age, address, additional_info) VALUES ($1, $2, $3, $4)',
                [fullName, age, address, additionalInfo]
            );
        }
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}

exports.getQueryData = async (query) => {
    return await pool.query(query);
}