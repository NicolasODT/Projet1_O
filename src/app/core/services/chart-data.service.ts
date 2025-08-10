import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { OlympicService } from './olympic.service';

// Interface pour les données de la page d'accueil
export interface HomePageData {
  chartData: { name: string; value: number; extra: { id: number } }[];
  numberOfJos: number;
  numberOfCountries: number;
}

// Interface pour les données de la page de détail
export interface DetailPageData {
  countryData: Olympic;
  lineChartData: { name: string; series: { name: string; value: number }[] }[];
  totalMedals: number;
  totalAthletes: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor(private olympicService: OlympicService) { }

  /**
   * Prépare les données nécessaires pour la page d'accueil.
   * @returns Un Observable contenant les données pour le graphique et les statistiques.
   */
  getHomePageData(): Observable<HomePageData | null> {
    return this.olympicService.getOlympics().pipe(
      map(data => {
        if (!data) {
          return null;
        }

        const chartData = data.map(olympic => ({
          name: olympic.country,
          value: olympic.participations.reduce((acc, curr) => acc + curr.medalsCount, 0),
          extra: { id: olympic.id },
        }));

        const uniqueYears = new Set<number>();
        data.forEach(olympic => {
          olympic.participations.forEach(p => uniqueYears.add(p.year));
        });

        return {
          chartData,
          numberOfCountries: data.length,
          numberOfJos: uniqueYears.size,
        };
      })
    );
  }

  /**
   * Prépare les données nécessaires pour la page de détail d'un pays.
   * @param countryId L'ID du pays.
   * @returns Un Observable contenant les données pour le graphique et les statistiques du pays.
   */
  getDetailPageData(countryId: number): Observable<DetailPageData | null> {
    return this.olympicService.getOlympics().pipe(
      map(data => {
        if (!data) {
          return null;
        }
        const countryData = data.find(olympic => olympic.id === countryId);

        if (!countryData) {
          return null;
        }

        const totalMedals = countryData.participations.reduce((acc, p) => acc + p.medalsCount, 0);
        const totalAthletes = countryData.participations.reduce((acc, p) => acc + p.athleteCount, 0);

        const lineChartData = [{
          name: countryData.country,
          series: countryData.participations.map(p => ({
            name: p.year.toString(),
            value: p.medalsCount
          }))
        }];

        return {
          countryData,
          lineChartData,
          totalMedals,
          totalAthletes,
        };
      })
    );
  }
}
