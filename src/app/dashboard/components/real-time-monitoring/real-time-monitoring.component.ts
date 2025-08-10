import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

interface RealtimeMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface LiveActivity {
  id: string;
  action: string;
  campaign: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}

@Component({
  selector: 'app-real-time-monitoring',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule],
  template: `
    <mat-card>
      <mat-card-header class="pb-3">
        <div class="flex items-center justify-between w-full">
          <mat-card-title class="flex items-center gap-2">
            <div class="relative">
              <mat-icon class="text-blue-500">monitor_heart</mat-icon>
              <div class="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            Real-time Monitoring
          </mat-card-title>
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            Live Updates
          </div>
        </div>
      </mat-card-header>
      <mat-card-content>
        <!-- Real-time Metrics -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div 
            *ngFor="let metric of realtimeMetrics; trackBy: trackByLabel"
            class="p-2 border rounded-lg text-center">
            <div class="text-xs text-muted-foreground mb-1">{{metric.label}}</div>
            <div class="font-semibold" [style.color]="metric.color">{{metric.value}}</div>
            <div class="flex items-center justify-center gap-1 text-xs">
              <mat-icon 
                class="text-xs"
                [class.text-green-500]="metric.trend === 'up'"
                [class.text-red-500]="metric.trend === 'down'"
                [class.text-gray-500]="metric.trend === 'stable'">
                {{getTrendIcon(metric.trend)}}
              </mat-icon>
              <span class="text-muted-foreground">{{metric.change}}</span>
            </div>
          </div>
        </div>

        <!-- Live Activity Feed -->
        <div class="border rounded-lg">
          <div class="p-3 border-b bg-gray-50 dark:bg-gray-800">
            <h4 class="font-medium flex items-center gap-2">
              <mat-icon class="text-sm">activity_zone</mat-icon>
              Live Activity Feed
            </h4>
          </div>
          <div class="max-h-48 overflow-y-auto">
            <div 
              *ngFor="let activity of liveActivities; trackBy: trackById; let last = last"
              class="p-3 text-sm"
              [class.border-b]="!last">
              
              <div class="flex items-start gap-3">
                <div 
                  class="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  [class.bg-green-500]="activity.status === 'success'"
                  [class.bg-yellow-500]="activity.status === 'warning'"
                  [class.bg-red-500]="activity.status === 'error'">
                </div>
                <div class="flex-1 min-w-0">
                  <p class="truncate">{{activity.action}}</p>
                  <div class="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{{activity.campaign}}</span>
                    <span>•</span>
                    <span>{{activity.timestamp}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- System Status -->
        <div class="mt-4 grid grid-cols-3 gap-3 text-xs">
          <div class="text-center p-2 bg-green-50 dark:bg-green-950/20 rounded">
            <div class="font-medium text-green-700 dark:text-green-400">API Status</div>
            <div class="text-green-600">99.9% Uptime</div>
          </div>
          <div class="text-center p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
            <div class="font-medium text-blue-700 dark:text-blue-400">Processing</div>
            <div class="text-blue-600">4.2k/min</div>
          </div>
          <div class="text-center p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
            <div class="font-medium text-orange-700 dark:text-orange-400">Queue</div>
            <div class="text-orange-600">12 pending</div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .text-blue-500 {
      color: #3b82f6;
    }
    .text-green-500 {
      color: #10b981;
    }
    .text-red-500 {
      color: #ef4444;
    }
    .text-gray-500 {
      color: #6b7280;
    }
    .text-muted-foreground {
      color: hsl(var(--muted-foreground));
    }
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
  `]
})
export class RealTimeMonitoringComponent implements OnInit, OnDestroy {
  realtimeMetrics: RealtimeMetric[] = [
    { label: 'Active Campaigns', value: '6', change: '+2', trend: 'up', color: '#3b82f6' },
    { label: 'Messages/min', value: '1.2k', change: '+8%', trend: 'up', color: '#10b981' },
    { label: 'Delivery Rate', value: '97.8%', change: '+0.3%', trend: 'up', color: '#8b5cf6' },
    { label: 'Error Rate', value: '0.2%', change: '-0.1%', trend: 'down', color: '#ef4444' }
  ];

  liveActivities: LiveActivity[] = [
    { 
      id: '1', 
      action: 'Diwali Festival campaign started execution', 
      campaign: 'DIWALI_2024', 
      timestamp: 'just now', 
      status: 'success' 
    },
    { 
      id: '2', 
      action: 'WhatsApp message batch completed (1,000 msgs)', 
      campaign: 'SERVICE_REMINDER', 
      timestamp: '2m ago', 
      status: 'success' 
    },
    { 
      id: '3', 
      action: 'SMS delivery rate dropped below threshold', 
      campaign: 'PROMOTIONAL_OFFERS', 
      timestamp: '5m ago', 
      status: 'warning' 
    },
    { 
      id: '4', 
      action: 'RCS campaign paused due to high bounce rate', 
      campaign: 'NEW_LAUNCH', 
      timestamp: '8m ago', 
      status: 'error' 
    },
    { 
      id: '5', 
      action: 'Email campaign scheduled successfully', 
      campaign: 'NEWSLETTER_Q4', 
      timestamp: '12m ago', 
      status: 'success' 
    }
  ];

  private updateInterval?: number;

  ngOnInit() {
    // Simulate real-time updates
    this.updateInterval = window.setInterval(() => {
      this.updateMetrics();
      this.addNewActivity();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  trackByLabel(index: number, metric: RealtimeMetric): string {
    return metric.label;
  }

  trackById(index: number, activity: LiveActivity): string {
    return activity.id;
  }

  getTrendIcon(trend: 'up' | 'down' | 'stable'): string {
    switch (trend) {
      case 'up': return 'trending_up';
      case 'down': return 'trending_down';
      case 'stable': return 'trending_flat';
    }
  }

  private updateMetrics() {
    // Simulate metric updates
    this.realtimeMetrics = this.realtimeMetrics.map(metric => ({
      ...metric,
      value: this.getRandomValue(metric.label),
    }));
  }

  private addNewActivity() {
    // Simulate new activity
    const newActivity: LiveActivity = {
      id: Date.now().toString(),
      action: 'New campaign activity detected',
      campaign: 'AUTO_CAMPAIGN',
      timestamp: 'just now',
      status: 'success'
    };
    
    this.liveActivities = [newActivity, ...this.liveActivities.slice(0, 4)];
  }

  private getRandomValue(label: string): string {
    const base = this.realtimeMetrics.find(m => m.label === label)?.value || '0';
    const num = parseInt(base.replace(/[^0-9]/g, ''));
    const variance = Math.floor(Math.random() * 10) - 5;
    return base.replace(/[0-9]+/, (num + variance).toString());
  }
}