import { User, CSVParseResult } from '../types';

export interface ICSVParser {
  parse(): Promise<CSVParseResult>;
  validateHeaders(headers: string[]): boolean;
  parseLine(line: string, headers: string[]): User;
}
