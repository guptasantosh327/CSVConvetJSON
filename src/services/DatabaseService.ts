import { Pool, PoolClient } from 'pg';
import { User } from '../types';
import { IDatabaseService } from '../interfaces/IDatabaseService';
import { DatabaseConfig } from '../types';

export class DatabaseService implements IDatabaseService {
  private pool: Pool;

  constructor(config: DatabaseConfig) {
    this.pool = new Pool({
      connectionString: config.connectionString,
    });

    // Handle pool errors
    this.pool.on('error', err => {
      console.error('Unexpected error on idle client', err);
    });
  }

  public async connect(): Promise<void> {
    try {
      await this.pool.query('SELECT NOW()');
      console.log('Database connected successfully');
    } catch (error) {
      throw new Error(
        `Failed to connect to database: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.pool.end();
      console.log('Database disconnected successfully');
    } catch (error) {
      throw new Error(
        `Failed to disconnect from database: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  public async createTable(): Promise<void> {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS public.users (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        age INT NOT NULL,
        address JSONB NULL,
        additional_info JSONB NULL
      );
    `;

    try {
      await this.pool.query(createTableQuery);
      console.log('Users table created/verified successfully');
    } catch (error) {
      throw new Error(
        `Failed to create table: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  public async insertData(users: User[]): Promise<void> {
    const insertQuery = `
      INSERT INTO users (name, age, address, additional_info) 
      VALUES ($1, $2, $3, $4)
    `;

    const client: PoolClient = await this.pool.connect();

    try {
      await client.query('BEGIN');

      for (const user of users) {
        const { name, age, address, additional_info } = user;
        const fullName = `${name.firstName} ${name.lastName}`;

        await client.query(insertQuery, [fullName, age, address, additional_info]);
      }

      await client.query('COMMIT');
      console.log(`Successfully inserted ${users.length} users`);
    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error(
        `Failed to insert data: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      client.release();
    }
  }

  public async getUsers(): Promise<User[]> {
    try {
      const result = await this.pool.query('SELECT * FROM users ORDER BY id');
      return result.rows.map(this.mapRowToUser);
    } catch (error) {
      throw new Error(
        `Failed to get users: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private mapRowToUser(row: any): User {
    const { name, address, additional_info, ...rest } = row;

    // Parse the name back to firstName and lastName
    const nameParts = name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    return {
      name: { firstName, lastName },
      age: rest.age,
      address: address || {},
      gender: additional_info?.gender || '',
      additional_info: additional_info || {},
    };
  }
}
