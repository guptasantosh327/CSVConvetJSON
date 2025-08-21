export interface User {
  name: {
    firstName: string;
    lastName: string;
  };
  age: number;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
  };
  gender: string;
  additional_info: Record<string, unknown>;
}

export interface AgeDistribution {
  '<20': number;
  '20-40': number;
  '40-60': number;
  '>60': number;
}

export interface AgeDistributionResult {
  'Age-Group': string;
  '% Distribution': number;
}

export interface CSVParseResult {
  success: boolean;
  data?: User[];
  error?: string;
}

export interface DatabaseConfig {
  connectionString: string;
}

export interface CSVConfig {
  filePath: string;
  encoding?: BufferEncoding;
}
