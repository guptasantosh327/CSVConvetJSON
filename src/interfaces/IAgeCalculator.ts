import { AgeDistribution, AgeDistributionResult } from '../types';

export interface IAgeCalculator {
  calculateDistribution(ages: number[]): AgeDistribution;
  calculatePercentageDistribution(
    distribution: AgeDistribution,
    total: number
  ): AgeDistributionResult[];
  formatResults(results: AgeDistributionResult[]): void;
}
