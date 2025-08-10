import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LegendPosition } from '@swimlane/ngx-charts';
import { ChartDataService } from 'src/app/core/services/chart-data.service';
import { HomePageData } from 'src/app/core/models/HomePageData';

// Interface pour l'événement de sélection
interface ChartSelectEvent {
  name: string;
  value: number;
  extra: { id: number };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public homePageData$: Observable<HomePageData | null> = of(null);
  public screenWidth!: number;

  constructor(
    private chartDataService: ChartDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.homePageData$ = this.chartDataService.getHomePageData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event): void {
    this.screenWidth = window.innerWidth;
  }

  get legendPosition(): LegendPosition {
    return this.screenWidth < 768 ? LegendPosition.Below : LegendPosition.Right;
  }

  onSelect(event: ChartSelectEvent): void {
    if (event.extra && event.extra.id) {
      this.router.navigate(['/detail', event.extra.id]);
    }
  }
}
