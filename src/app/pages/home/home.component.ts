import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[] | undefined> = of([]);
  private subscription: Subscription | undefined;

  // Données pour le graphique
  public chartData: { name: string; value: number; }[] = [];
  public numberOfJos = 0;
  public numberOfCountries = 0;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    // On s'abonne aux données des JO
    this.subscription = this.olympicService.getOlympics().subscribe(data => {
      if (data) {
        // On calcule le nombre de pays
        this.numberOfCountries = data.length;

        // On prépare les données pour le graphique : { nom du pays, total des médailles }
        this.chartData = data.map(olympic => ({
          name: olympic.country,
          value: olympic.participations.reduce((acc, curr) => acc + curr.medalsCount, 0),
        }));

        // On calcule le nombre unique de JO
        const uniqueYears = new Set<number>();
        data.forEach(olympic => {
          olympic.participations.forEach(participation => {
            uniqueYears.add(participation.year);
          });
        });
        this.numberOfJos = uniqueYears.size;
      }
    });
  }

  // Cette fonction sera appelée quand on clique sur un pays dans le graphique
  onSelect(event: { name: string; value: number; }): void {
    // On cherche l'ID du pays cliqué pour naviguer vers sa page de détail
    this.olympicService.getOlympics().subscribe(data => {
      const country = data?.find(o => o.country === event.name);
      if (country) {
        this.router.navigate(['/detail', country.id]);
      }
    }).unsubscribe(); // On se désabonne tout de suite
  }

  ngOnDestroy(): void {
    // On se désabonne pour éviter les fuites de mémoire
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
