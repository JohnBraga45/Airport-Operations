import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OpsApiService } from './ops-api.service';
import { Aircraft, OperationalStatus } from './models';
import { interval, Subject, startWith } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

type SortKey = 'lastMaintenanceCheck' | 'operationalStatus';

@Component({
  selector: 'app-aircraft-board',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './aircraft-board.component.html',
  styleUrls: ['./aircraft-board.component.css']
})
export class AircraftBoardComponent implements OnInit, OnDestroy {
  aircraft: Aircraft[] = [];
  visibleAircraft: Aircraft[] = [];
  loading = true;
  private stop$ = new Subject<void>();

  statusOptions: Array<'ALL' | OperationalStatus> = ['ALL', 'OPERATIONAL', 'MAINTENANCE', 'GROUNDED'];
  selectedStatus: 'ALL' | OperationalStatus = 'ALL';
  sortKey: SortKey = 'lastMaintenanceCheck';
  sortDir: 'asc' | 'desc' = 'desc';

  constructor(private api: OpsApiService) {}

  ngOnInit() {
    interval(20000).pipe(
      startWith(0),
      tap(() => this.loading = true),
      switchMap(() => this.api.getAircraft()),
      takeUntil(this.stop$)
    ).subscribe({
      next: data => {
        this.aircraft = data;
        this.applyFiltersAndSort();
        this.loading = false;
      },
      error: () => {
        this.aircraft = [];
        this.visibleAircraft = [];
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }

  onStatusChange(value: 'ALL' | OperationalStatus) {
    this.selectedStatus = value;
    this.applyFiltersAndSort();
  }

  onSortKeyChange(value: SortKey) {
    this.sortKey = value;
    this.applyFiltersAndSort();
  }

  toggleSortDir() {
    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    this.applyFiltersAndSort();
  }

  private applyFiltersAndSort() {
    let list = [...this.aircraft];

    if (this.selectedStatus !== 'ALL') {
      list = list.filter(a => a.operationalStatus === this.selectedStatus);
    }

    list.sort((a, b) => {
      if (this.sortKey === 'operationalStatus') {
        return this.sortDir === 'asc'
          ? a.operationalStatus.localeCompare(b.operationalStatus)
          : b.operationalStatus.localeCompare(a.operationalStatus);
      }
      const av = new Date(a.lastMaintenanceCheck).getTime();
      const bv = new Date(b.lastMaintenanceCheck).getTime();
      return this.sortDir === 'asc' ? av - bv : bv - av;
    });

    this.visibleAircraft = list;
  }
}