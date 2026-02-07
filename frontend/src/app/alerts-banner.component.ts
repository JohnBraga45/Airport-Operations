import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OpsApiService } from './ops-api.service';
import { Alert } from './models';
import { interval, Subject, startWith } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-alerts-banner',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './alerts-banner.component.html',
  styleUrls: ['./alerts-banner.component.css']
})
export class AlertsBannerComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];
  loading = true;
  private stop$ = new Subject<void>();

  constructor(private api: OpsApiService) {}

  ngOnInit() {
    interval(15000).pipe(
      startWith(0),
      tap(() => this.loading = true),
      switchMap(() => this.api.getAlerts()),
      takeUntil(this.stop$)
    ).subscribe({
      next: data => {
        this.alerts = data;
        this.loading = false;
      },
      error: () => {
        this.alerts = [];
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }
}