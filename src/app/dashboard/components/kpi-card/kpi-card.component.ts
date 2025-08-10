
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="kpi-card">
      <div class="kpi-header">
        <h3 class="kpi-title">{{ title }}</h3>
        <span *ngIf="icon" class="kpi-icon material-icons">{{ icon }}</span>
      </div>
      <div class="kpi-value">{{ value }}</div>
      <div class="kpi-subtitle">{{ subtitle }}</div>
      <div class="kpi-trend" [ngClass]="{'positive': trendPositive, 'negative': !trendPositive}">
        {{ trendLabel }}
      </div>
    </div>
  `,
  styles: [`
    .kpi-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .kpi-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .kpi-title {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0;
      font-weight: 500;
    }
    .kpi-icon {
      color: #3b82f6;
    }
    .kpi-value {
      font-size: 2rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }
    .kpi-subtitle {
      font-size: 0.875rem;
      color: #64748b;
      margin-bottom: 0.5rem;
    }
    .kpi-trend {
      font-size: 0.75rem;
      font-weight: 500;
    }
    .kpi-trend.positive {
      color: #22c55e;
    }
    .kpi-trend.negative {
      color: #ef4444;
    }
  `]
})
export class KpiCardComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() subtitle: string = '';
  @Input() trendLabel: string = '';
  @Input() trendPositive: boolean = true;
  @Input() icon?: string;
}
