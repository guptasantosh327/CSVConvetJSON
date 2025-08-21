import { ServiceFactory } from '../factories/ServiceFactory';
import { CSVParserService } from '../services/CSVParserService';
import { DatabaseService } from '../services/DatabaseService';
import { AgeCalculatorService } from '../services/AgeCalculatorService';
import { User } from '../types';

export class CSVProcessingController {
  private csvParser: CSVParserService;
  private databaseService: DatabaseService;
  private ageCalculator: AgeCalculatorService;

  constructor() {
    const factory = ServiceFactory.getInstance();
    this.csvParser = factory.createCSVParser();
    this.databaseService = factory.createDatabaseService();
    this.ageCalculator = factory.createAgeCalculator();
  }

  public async processCSV(): Promise<void> {
    try {
      console.log('🚀 Starting CSV processing...');

      // Connect to database
      await this.databaseService.connect();

      // Create table
      await this.databaseService.createTable();

      // Parse CSV
      const parseResult = await this.csvParser.parse();
      if (!parseResult.success || !parseResult.data) {
        throw new Error(`CSV parsing failed: ${parseResult.error}`);
      }

      console.log(`Parsed ${parseResult.data.length} users from CSV`);

      // Insert data into database
      await this.databaseService.insertData(parseResult.data);

      // Calculate and display age distribution
      await this.calculateAndDisplayAgeDistribution();

      console.log('\nCSV processing completed successfully!');
    } catch (error) {
      console.error(
        'Error during CSV processing:',
        error instanceof Error ? error.message : String(error)
      );
      throw error;
    }
  }

  public async calculateAndDisplayAgeDistribution(): Promise<void> {
    try {
      const users = await this.databaseService.getUsers();
      const ages = users.map(user => user.age);

      if (ages.length === 0) {
        console.log('No age data available for analysis');
        return;
      }

      // Calculate distribution
      const distribution = this.ageCalculator.calculateDistribution(ages);
      const percentageResults = this.ageCalculator.calculatePercentageDistribution(
        distribution,
        ages.length
      );

      // Display results
      this.ageCalculator.formatResults(percentageResults);
    } catch (error) {
      console.error(
        'Error calculating age distribution:',
        error instanceof Error ? error.message : String(error)
      );
      throw error;
    }
  }

  public async getAllUsers(): Promise<User[]> {
    try {
      return await this.databaseService.getUsers();
    } catch (error) {
      console.error(
        'Error getting all users:',
        error instanceof Error ? error.message : String(error)
      );
      throw error;
    }
  }
}
