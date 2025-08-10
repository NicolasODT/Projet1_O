import { Olympic } from './Olympic';

export interface DetailPageData {
  countryData: Olympic;
  lineChartData: { name: string; series: { name: string; value: number }[] }[];
  totalMedals: number;
  totalAthletes: number;
}
