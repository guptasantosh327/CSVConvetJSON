import { CSVParserService } from '../services/CSVParserService';
import { DatabaseService } from '../services/DatabaseService';
import { AgeCalculatorService } from '../services/AgeCalculatorService';
import { CSVConfig, DatabaseConfig } from '../types';

export class ServiceFactory {
  private static instance: ServiceFactory;
  private csvConfig: CSVConfig;
  private dbConfig: DatabaseConfig;

  private constructor() {
    this.csvConfig = {
      filePath: process.env['CSV_PATH'] || './csv/sample.csv',
      encoding: 'utf-8',
    };

    this.dbConfig = {
      connectionString: process.env['DATABASE_URL'] || 'postgresql://localhost:5432/csv_to_json_db',
    };
  }

  public static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  public createCSVParser(): CSVParserService {
    return new CSVParserService(this.csvConfig);
  }

  public createDatabaseService(): DatabaseService {
    return new DatabaseService(this.dbConfig);
  }

  public createAgeCalculator(): AgeCalculatorService {
    return new AgeCalculatorService();
  }

  public updateCSVConfig(config: Partial<CSVConfig>): void {
    this.csvConfig = { ...this.csvConfig, ...config };
  }

  public updateDatabaseConfig(config: Partial<DatabaseConfig>): void {
    this.dbConfig = { ...this.dbConfig, ...config };
  }

  public getCSVConfig(): CSVConfig {
    return { ...this.csvConfig };
  }

  public getDatabaseConfig(): DatabaseConfig {
    return { ...this.dbConfig };
  }
}
