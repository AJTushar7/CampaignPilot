import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heatmap-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="heatmap-card">
      <div class="card-header">
        <h3 class="card-title">
          <span class="material-icons">whatshot</span>
          Peak Engagement Heatmap
        </h3>
      </div>
      <div class="card-content">
        <div class="stats-grid">
          <div class="stat-item">
            <h4>WhatsApp</h4>
            <div class="stat-value blue">68.5%</div>
            <div class="stat-label">Peak: Tue at 10 AM</div>
          </div>
          <div class="stat-item">
            <h4>SMS</h4>
            <div class="stat-value green">54.2%</div>
            <div class="stat-label">Peak: Wed at 11 AM</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .heatmap-card {
      background: white;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .card-header {
      padding: 1.5rem 1.5rem 0;
    }
    .card-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
    }
    .card-title .material-icons {
      color: #f97316;
    }
    .card-content {
      padding: 1.5rem;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .stat-item {
      padding: 1rem;
      background: #f8fafc;
      border-radius: 8px;
    }
    .stat-item h4 {
      margin: 0 0 0.5rem 0;
      font-weight: 600;
      color: #1e293b;
    }
    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }
    .stat-value.blue {
      color: #2563eb;
    }
    .stat-value.green {
      color: #16a34a;
    }
    .stat-label {
      font-size: 0.875rem;
      color: #64748b;
    }
  `]
})
export class HeatmapSectionComponent {
}