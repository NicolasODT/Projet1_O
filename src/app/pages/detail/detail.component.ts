import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {Olympic} from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  public countryData: Olympic | undefined;
  public totalMedals = 0;
  public totalAthletes = 0;
  public lineChartData: { name: string, series: { name: string, value: number }[] }[] = [];
  private subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    const countryId = +this.route.snapshot.params['id']; // On récupère l'ID du pays

    this.subscription = this.olympicService.getOlympics().subscribe(data => {
      if (data) {
        this.countryData = data.find(olympic => olympic.id === countryId);

        if (this.countryData) {
          // Calculer les totaux
          this.totalMedals = this.countryData.participations.reduce((acc, p) => acc + p.medalsCount, 0);
          this.totalAthletes = this.countryData.participations.reduce((acc, p) => acc + p.athleteCount, 0);

          // Préparer les données pour le graphique en ligne
          this.lineChartData = [
            {
              name: this.countryData.country,
              series: this.countryData.participations.map(p => ({
                name: p.year.toString(),
                value: p.medalsCount
              }))
            }
          ];
        }
      }
    });
  }

  goBack(): void {
    this.router.navigateByUrl('');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
