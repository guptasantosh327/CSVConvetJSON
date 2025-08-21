import { User } from '../types';

export interface IDatabaseService {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  createTable(): Promise<void>;
  insertData(users: User[]): Promise<void>;
  getUsers(): Promise<User[]>;
}
