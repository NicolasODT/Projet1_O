import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { LegendPosition } from '@swimlane/ngx-charts'; // <-- 1. IMPORTER CECI

// Interface pour typer les données du graphique et l'événement de sélection
interface ChartData {
  name: string;
  value: number;
  extra: { id: number };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  private olympicData: Olympic[] = [];
  public chartData: ChartData[] = [];
  public numberOfJos = 0;
  public numberOfCountries = 0;
  public screenWidth!: number;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.subscription = this.olympicService.getOlympics().subscribe(data => {
      if (data) {
        this.olympicData = data;
        this.numberOfCountries = data.length;
        this.chartData = data.map(olympic => ({
          name: olympic.country,
          value: olympic.participations.reduce((acc, curr) => acc + curr.medalsCount, 0),
          extra: { id: olympic.id },
        }));
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

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event): void {
    this.screenWidth = window.innerWidth;
  }

  // 2. UTILISER LE TYPE ICI
  get legendPosition(): LegendPosition {
    return this.screenWidth < 768 ? LegendPosition.Below : LegendPosition.Right;
  }

  onSelect(event: ChartData): void {
    if (event.extra && event.extra.id) {
      this.router.navigate(['/detail', event.extra.id]);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
