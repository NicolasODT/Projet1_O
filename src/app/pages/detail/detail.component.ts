import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChartDataService } from 'src/app/core/services/chart-data.service';
import { DetailPageData } from 'src/app/core/models/DetailPageData';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public detailPageData$: Observable<DetailPageData | null> = of(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chartDataService: ChartDataService
  ) {}

  ngOnInit(): void {
    this.detailPageData$ = this.route.params.pipe(
      switchMap(params => {
        const countryId = +params['id'];
        return this.chartDataService.getDetailPageData(countryId);
      })
    );
  }

  goBack(): void {
    this.router.navigateByUrl('');
  }
}
