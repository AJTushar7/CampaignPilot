import { Component, OnInit } from '@angular/core';
import { CampaignDataService, KpiMetric } from '../../services/campaign-data.service';

@Component({
  selector: 'app-kpi-cards',
  templateUrl: './kpi-cards.component.html',
  styleUrls: ['./kpi-cards.component.scss']
})
export class KpiCardsComponent implements OnInit {
  kpiMetrics: KpiMetric[] = [];
  loading = true;

  constructor(private campaignDataService: CampaignDataService) { }

  ngOnInit(): void {
    this.loadKpiMetrics();
  }

  private loadKpiMetrics(): void {
    this.campaignDataService.getKpiMetrics().subscribe({
      next: (metrics) => {
        this.kpiMetrics = metrics;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading KPI metrics:', error);
        this.loading = false;
      }
    });
  }

  getTrendIcon(growth: string): string {
    return growth.indexOf('+') === 0 ? 'pi-trending-up' : 'pi-trending-down';
  }

  getTrendColor(growth: string): string {
    return growth.indexOf('+') === 0 ? 'text-green-600' : 'text-red-600';
  }

  getProgressWidth(index: number): number {
    // Simulate progress based on growth values
    const progressValues = [85, 92, 78, 88, 95];
    return progressValues[index] || 75;
  }

  getLastUpdateTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  }
}