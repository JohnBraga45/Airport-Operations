import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsBoardComponent } from './flights-board.component';
import { AircraftBoardComponent } from './aircraft-board.component';
import { AlertsBannerComponent } from './alerts-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FlightsBoardComponent, AircraftBoardComponent, AlertsBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  isDemo = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('demo') === 'true';
  year = new Date().getFullYear();

  get demoUrl(): string {
    const url = new URL(window.location.href);
    url.searchParams.set('demo', 'true');
    return url.toString();
  }
}
