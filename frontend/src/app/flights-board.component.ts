import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpsApiService, Flight, FlightStatus } from './ops-api.service';
import { interval, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-flights-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flights-board.component.html',
})
export class FlightsBoardComponent {
  private destroy$ = new Subject<void>();
  flights: Flight[] = [];
  filtered: Flight[] = [];
  loading = true;

  // filtros e ordenação
  statusFilter: FlightStatus | 'ALL' = 'ALL';
  sortKey: 'scheduledDeparture' | 'estimatedDeparture' | 'flightNumber' = 'scheduledDeparture';
  sortDir: 'asc' | 'desc' = 'asc';

  constructor(private api: OpsApiService) {}

  ngOnInit() {
    interval(10000)
      .pipe(
        startWith(0),
        tap(() => (this.loading = true)),
        switchMap(() => this.api.getFlights()),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (flights) => {
          this.flights = flights;
          this.applyFiltersAndSorting();
          this.loading = false;
        },
        error: () => {
          this.flights = [];
          this.filtered = [];
          this.loading = false;
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFiltersAndSorting() {
    const base =
      this.statusFilter === 'ALL'
        ? this.flights
        : this.flights.filter((f) => f.status === this.statusFilter);

    const sorted = [...base].sort((a, b) => {
      if (this.sortKey === 'flightNumber') {
        const cmp = a.flightNumber.localeCompare(b.flightNumber);
        return this.sortDir === 'asc' ? cmp : -cmp;
      }
      const av = new Date(a[this.sortKey]).getTime();
      const bv = new Date(b[this.sortKey]).getTime();
      const cmp = av - bv;
      return this.sortDir === 'asc' ? cmp : -cmp;
    });

    this.filtered = sorted;
  }
}