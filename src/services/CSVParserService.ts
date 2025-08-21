import { readFile } from 'fs/promises';
import { User, CSVParseResult, CSVConfig } from '../types';
import { ICSVParser } from '../interfaces/ICSVParser';

export class CSVParserService implements ICSVParser {
  private config: CSVConfig;

  constructor(config: CSVConfig) {
    this.config = config;
  }

  public async parse(): Promise<CSVParseResult> {
    try {
      const fileContent = await readFile(this.config.filePath, this.config.encoding || 'utf-8');
      const content = fileContent.toString();
      const lines = content.split('\n').filter((line: string) => line.trim() !== '');

      if (lines.length < 2) {
        return {
          success: false,
          error: 'CSV file must have at least headers and one data row',
        };
      }

      const headers = lines[0]!.split(',').map((header: string) => header.trim());
      const users: User[] = [];

      for (let i = 1; i < lines.length; i++) {
        try {
          const user = this.parseLine(lines[i]!, headers);
          users.push(user);
        } catch (error) {
          console.warn(
            `Skipping invalid line ${i + 1}: ${error instanceof Error ? error.message : String(error)}`
          );
          continue;
        }
      }

      return {
        success: true,
        data: users,
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to parse CSV: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  public validateHeaders(headers: string[]): boolean {
    const requiredHeaders = [
      'name.firstName',
      'name.lastName',
      'age',
      'address.line1',
      'address.line2',
      'address.city',
      'address.state',
      'gender',
    ];

    return requiredHeaders.every((required: string) => headers.includes(required));
  }

  public parseLine(line: string, headers: string[]): User {
    const values = this.parseCSVLine(line);

    if (values.length !== headers.length) {
      throw new Error(`Line has ${values.length} values but ${headers.length} headers`);
    }

    const user: Partial<User> = {} as Partial<User>;
    const additionalInfo: Record<string, unknown> = {};

    // Define core fields that should be parsed as structured data
    const coreFields = [
      'name.firstName',
      'name.lastName',
      'age',
      'address.line1',
      'address.line2',
      'address.city',
      'address.state',
      'gender',
    ];

    headers.forEach((header: string, index: number) => {
      const value = values[index]!.trim();

      if (coreFields.includes(header)) {
        // Parse core fields into structured objects
        const keys = header.split('.');

        if (keys.length === 1) {
          // Direct field (age, gender)
          (user as any)[keys[0]!] = this.parseValue(keys[0]!, value);
        } else {
          // Nested field (name.firstName, address.city)
          const rootKey = keys[0]!;
          const nestedKey = keys[1]!;

          if (!(user as any)[rootKey]) {
            (user as any)[rootKey] = {};
          }

          (user as any)[rootKey][nestedKey] = this.parseValue(nestedKey, value);
        }
      } else {
        // Handle additional fields with nested structure (e.g., 'hie.data.fname.rata.gita')
        const keys = header.split('.');
        this.createNestedObjectInAdditionalInfo(additionalInfo, keys, value);
      }
    });

    // Add additional_info to the user object
    (user as any).additional_info = additionalInfo;
    return user as User;
  }

  private createNestedObjectInAdditionalInfo(
    additionalInfo: Record<string, unknown>,
    keys: string[],
    value: string
  ): void {
    let current = additionalInfo;

    // Navigate through the nested structure
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]!;
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key] as Record<string, unknown>;
    }

    // Set the final value
    const lastKey = keys[keys.length - 1]!;
    current[lastKey] = value;
  }

  private parseValue(key: string, value: string): unknown {
    // Convert age to number if it's the age field
    if (key === 'age') {
      const age = parseInt(value, 10);
      if (isNaN(age)) {
        throw new Error(`Invalid age value: ${value}`);
      }
      return age;
    }
    return value;
  }

  private parseCSVLine(line: string): string[] {
    return line.split(',').map(field => field.trim());
  }
}
