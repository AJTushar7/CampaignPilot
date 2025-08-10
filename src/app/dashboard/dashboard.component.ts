import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { AlertsTickerComponent } from './components/alerts-ticker/alerts-ticker.component';
import { ChannelOverviewComponent } from './components/channel-overview/channel-overview.component';
import { CampaignTableComponent } from './components/campaign-table/campaign-table.component';
import { BSPComparisonComponent } from './components/bsp-comparison/bsp-comparison.component';
import { RealTimeMonitoringComponent } from './components/real-time-monitoring/real-time-monitoring.component';
import { HeatmapSectionComponent } from './components/heatmap-section/heatmap-section.component';
import { BudgetPerformanceComponent } from './components/budget-performance/budget-performance.component';
import { CostOptimizationComponent } from './components/cost-optimization/cost-optimization.component';
import { FestivalTimelineComponent } from './components/festival-timeline/festival-timeline.component';
import { OrchestrationAnalysisComponent } from './components/orchestration-analysis/orchestration-analysis.component';
import { AlertItem } from '../models/campaign.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    KpiCardComponent,
    AlertsTickerComponent,
    ChannelOverviewComponent,
    CampaignTableComponent,
    BSPComparisonComponent,
    RealTimeMonitoringComponent,
    HeatmapSectionComponent,
    BudgetPerformanceComponent,
    CostOptimizationComponent,
    FestivalTimelineComponent,
    OrchestrationAnalysisComponent
  ],
  template: `
    <div class="dashboard-container">
      <!-- Header -->
      <div class="dashboard-header">
        <div>
          <h1 class="dashboard-title">Total Campaigns: 128</h1>
          <div class="dashboard-subtitle">
            <span>Active: 6</span>
            <span>Scheduled: 12</span>
            <span>Completed: 110</span>
            <span>Last 15 days window</span>
          </div>
          <p class="live-status">Live Updates Active</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-outline">Calendar</button>
          <select [(ngModel)]="selectedChannel" class="channel-select">
            <option value="all-channels">All Channels</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="sms">SMS</option>
            <option value="email">Email</option>
          </select>
          <button class="btn btn-primary">New Campaign</button>
        </div>
      </div>

      <!-- Alerts ticker -->
      <app-alerts-ticker [items]="alertItems"></app-alerts-ticker>

      <!-- KPI cards -->
      <div class="kpi-grid">
        <app-kpi-card
          title="Total Revenue"
          value="₹50.5L"
          subtitle="vs last month"
          trendLabel="+18.5%"
          [trendPositive]="true"
          icon="trending_up"
        ></app-kpi-card>
        <app-kpi-card
          title="Campaign ROI"
          value="6.0x"
          subtitle="improvement"
          trendLabel="+2.1x"
          [trendPositive]="true"
        ></app-kpi-card>
        <app-kpi-card
          title="Messages Sent"
          value="4.8M"
          subtitle="Across all channels"
          trendLabel="+3.2%"
          [trendPositive]="true"
          icon="message"
        ></app-kpi-card>
        <app-kpi-card
          title="Avg Conversion Rate"
          value="10.7%"
          subtitle="from target"
          trendLabel="+3.2%"
          [trendPositive]="true"
        ></app-kpi-card>
      </div>

      <!-- AI-Powered Optimization Insights -->
      <div class="optimization-card">
        <div class="card-header">
          <h3 class="card-title">
            <span class="material-icons">psychology</span>
            AI-Powered Optimization Insights
          </h3>
          <p class="card-subtitle">Smart recommendations to maximize campaign performance</p>
        </div>
        <div class="insights-grid">
          <div class="insight-item">
            <div class="insight-confidence">94% confidence</div>
            <h4>Channel Mix Optimization</h4>
            <p>Switch 30% SMS traffic to WhatsApp</p>
            <div class="insight-benefit">32% cost reduction</div>
            <button class="btn btn-outline">Apply Insight</button>
          </div>
          <div class="insight-item">
            <div class="insight-confidence">89% confidence</div>
            <h4>Timing Optimization</h4>
            <p>Send campaigns during peak hours (6-8 PM)</p>
            <div class="insight-benefit">28% engagement boost</div>
            <button class="btn btn-outline">Apply Insight</button>
          </div>
          <div class="insight-item">
            <div class="insight-confidence">91% confidence</div>
            <h4>Audience Segmentation</h4>
            <p>Create talent-based customer segments</p>
            <div class="insight-benefit">45% conversion uplift</div>
            <button class="btn btn-outline">Apply Insight</button>
          </div>
        </div>
      </div>

      <!-- Channel Performance -->
      <div class="performance-grid">
        <app-channel-overview></app-channel-overview>
        <app-heatmap-section></app-heatmap-section>
      </div>

      <!-- Real-time Campaign Monitoring -->
      <app-real-time-monitoring></app-real-time-monitoring>

      <!-- Cost Optimization Insights -->
      <app-cost-optimization></app-cost-optimization>

      <!-- Orchestration Analysis -->
      <app-orchestration-analysis></app-orchestration-analysis>

      <!-- Footer -->
      <div class="footer-tip">
        <p>Tips: Use orchestration to set WhatsApp as primary with SMS fallback to reduce cost per conversion by up to 18%.</p>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 1.5rem;
      min-height: 100vh;
      background-color: #f8fafc;
      gap: 1.5rem;
      display: flex;
      flex-direction: column;
    }
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .dashboard-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }
    .dashboard-subtitle {
      display: flex;
      gap: 1rem;
      font-size: 0.875rem;
      color: #64748b;
      margin-top: 0.5rem;
    }
    .live-status {
      font-size: 0.875rem;
      color: #64748b;
      margin-top: 0.25rem;
    }
    .header-actions {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }
    .btn {
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }
    .btn-primary {
      background: #3b82f6;
      color: white;
    }
    .btn-primary:hover {
      background: #2563eb;
    }
    .btn-outline {
      background: transparent;
      border: 1px solid #d1d5db;
      color: #374151;
    }
    .btn-outline:hover {
      background: #f9fafb;
    }
    .channel-select {
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.875rem;
      min-width: 150px;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .optimization-card {
      background: white;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      margin-bottom: 1.5rem;
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
      margin: 0 0 0.5rem 0;
    }
    .card-title .material-icons {
      color: #3b82f6;
    }
    .card-subtitle {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0;
    }
    .insights-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
      padding: 1.5rem;
    }
    .insight-item {
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
    }
    .insight-confidence {
      font-size: 0.75rem;
      color: #3b82f6;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    .insight-item h4 {
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 0.5rem 0;
    }
    .insight-item p {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0 0 0.75rem 0;
    }
    .insight-benefit {
      color: #16a34a;
      font-weight: 600;
      margin-bottom: 0.75rem;
    }
    .performance-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    .footer-tip {
      background: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .footer-tip p {
      margin: 0;
      font-size: 0.875rem;
      color: #64748b;
    }
    @media (max-width: 768px) {
      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
      .header-actions {
        width: 100%;
        justify-content: space-between;
      }
      .performance-grid {
        grid-template-columns: 1fr;
      }
      .insights-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent {
  alertItems: AlertItem[] = [
    {
      id: '1',
      text: 'WhatsApp API rate limit approaching - 85% capacity',
      type: 'warning',
      time: '2 min ago'
    },
    {
      id: '2',
      text: 'Festival campaign scheduled for tomorrow - 2.3M messages queued',
      type: 'info',
      time: '5 min ago'
    },
    {
      id: '3',
      text: 'SMS delivery failed for Airtel - investigating issue',
      type: 'error',
      time: '8 min ago'
    },
    {
      id: '4',
      text: 'Cost optimization saved ₹45,000 this week',
      type: 'success',
      time: '1 hour ago'
    }
  ];

  selectedChannel: string = 'all-channels';
}