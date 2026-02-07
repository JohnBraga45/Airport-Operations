import { Component, inject } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { OpsFacade } from '../../state/ops-facade.service';
import { AsyncState, Flight, Alert, Aircraft } from '../../domain/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  private facade = inject(OpsFacade);

  flights$: Observable<AsyncState<Flight[]>> = this.facade.flights$;
  aircraft$: Observable<AsyncState<Aircraft[]>> = this.facade.aircraft$;
  alerts$: Observable<AsyncState<Alert[]>> = this.facade.alerts$;

  lastError = this.facade.lastError;
}