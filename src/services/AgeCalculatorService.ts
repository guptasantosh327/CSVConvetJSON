import { AgeDistribution, AgeDistributionResult } from '../types';
import { IAgeCalculator } from '../interfaces/IAgeCalculator';

export class AgeCalculatorService implements IAgeCalculator {
  private readonly ageRanges = [
    { key: '<20' as const, min: 0, max: 19 },
    { key: '20-40' as const, min: 20, max: 40 },
    { key: '40-60' as const, min: 41, max: 60 },
    { key: '>60' as const, min: 61, max: 200 },
  ];

  public calculateDistribution(ages: number[]): AgeDistribution {
    const distribution: AgeDistribution = {
      '<20': 0,
      '20-40': 0,
      '40-60': 0,
      '>60': 0,
    };

    ages.forEach(age => {
      if (age < 20) {
        distribution['<20']++;
      } else if (age <= 40) {
        distribution['20-40']++;
      } else if (age <= 60) {
        distribution['40-60']++;
      } else {
        distribution['>60']++;
      }
    });

    return distribution;
  }

  public calculatePercentageDistribution(
    distribution: AgeDistribution,
    total: number
  ): AgeDistributionResult[] {
    if (total === 0) {
      return this.ageRanges.map(range => ({
        'Age-Group': range.key,
        '% Distribution': 0,
      }));
    }

    return this.ageRanges.map(range => ({
      'Age-Group': range.key,
      '% Distribution': parseFloat(((distribution[range.key] / total) * 100).toFixed(2)),
    }));
  }

  public formatResults(results: AgeDistributionResult[]): void {
    console.log('\n=== Age Distribution Analysis ===');
    console.table(results);
  }
}
