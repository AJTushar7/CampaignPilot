import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

interface OptimizationInsight {
  id: string;
  title: string;
  description: string;
  savings: string;
  impact: 'high' | 'medium' | 'low';
  category: 'channel' | 'timing' | 'targeting' | 'creative';
  actionable: boolean;
}

@Component({
  selector: 'app-cost-optimization',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <mat-card>
      <mat-card-header class="pb-3">
        <div class="flex items-center justify-between w-full">
          <mat-card-title class="flex items-center gap-2">
            <mat-icon class="text-emerald-500">savings</mat-icon>
            Cost Optimization
          </mat-card-title>
          <button mat-button class="text-sm">
            View All Insights
            <mat-icon class="ml-1">arrow_forward</mat-icon>
          </button>
        </div>
      </mat-card-header>
      <mat-card-content>
        <!-- Total Savings Summary -->
        <div class="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-muted-foreground">Potential Monthly Savings</div>
              <div class="text-2xl font-bold text-emerald-600">₹2.8L</div>
            </div>
            <div class="text-right">
              <div class="text-sm text-muted-foreground">ROI Improvement</div>
              <div class="text-xl font-bold text-emerald-600">+23%</div>
            </div>
          </div>
        </div>

        <!-- Optimization Insights -->
        <div class="space-y-3">
          <div 
            *ngFor="let insight of insights; trackBy: trackById" 
            class="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            
            <div class="flex items-start justify-between mb-2">
              <div class="flex-1">
                <h4 class="font-medium">{{insight.title}}</h4>
                <p class="text-sm text-muted-foreground mt-1">{{insight.description}}</p>
              </div>
              <div class="text-right ml-3">
                <div class="text-lg font-bold text-emerald-600">{{insight.savings}}</div>
                <div 
                  class="inline-flex h-6 w-auto items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase"
                  [class.bg-red-100]="insight.impact === 'high'"
                  [class.text-red-800]="insight.impact === 'high'"
                  [class.bg-yellow-100]="insight.impact === 'medium'"
                  [class.text-yellow-800]="insight.impact === 'medium'"
                  [class.bg-green-100]="insight.impact === 'low'"
                  [class.text-green-800]="insight.impact === 'low'">
                  {{insight.impact}} impact
                </div>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <mat-chip 
                  class="text-xs"
                  [class.bg-blue-100]="insight.category === 'channel'"
                  [class.text-blue-800]="insight.category === 'channel'"
                  [class.bg-purple-100]="insight.category === 'timing'"
                  [class.text-purple-800]="insight.category === 'timing'"
                  [class.bg-orange-100]="insight.category === 'targeting'"
                  [class.text-orange-800]="insight.category === 'targeting'"
                  [class.bg-pink-100]="insight.category === 'creative'"
                  [class.text-pink-800]="insight.category === 'creative'">
                  {{insight.category}}
                </mat-chip>
              </div>
              <button 
                *ngIf="insight.actionable" 
                mat-stroked-button 
                color="primary" 
                class="text-xs h-8">
                Apply
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <h4 class="font-medium mb-2 flex items-center gap-2">
            <mat-icon class="text-blue-500 text-sm">flash_on</mat-icon>
            Quick Optimizations
          </h4>
          <div class="flex flex-wrap gap-2">
            <button mat-stroked-button class="text-xs h-7">
              Switch to WhatsApp
            </button>
            <button mat-stroked-button class="text-xs h-7">
              Optimize Send Times
            </button>
            <button mat-stroked-button class="text-xs h-7">
              Reduce Frequency
            </button>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .text-emerald-500 {
      color: #10b981;
    }
    .text-emerald-600 {
      color: #059669;
    }
    .text-blue-500 {
      color: #3b82f6;
    }
    .text-muted-foreground {
      color: hsl(var(--muted-foreground));
    }
  `]
})
export class CostOptimizationComponent {
  insights: OptimizationInsight[] = [
    {
      id: '1',
      title: 'Switch SMS to WhatsApp for Premium Segment',
      description: 'WhatsApp has 28% higher engagement and 15% lower cost for premium customers',
      savings: '₹45k',
      impact: 'high',
      category: 'channel',
      actionable: true
    },
    {
      id: '2',
      title: 'Optimize Send Times for Email Campaigns',
      description: 'Sending between 10-11 AM increases open rates by 23% and reduces unsubscribes',
      savings: '₹18k',
      impact: 'medium',
      category: 'timing',
      actionable: true
    },
    {
      id: '3',
      title: 'Reduce RCS Campaign Frequency',
      description: 'Current frequency causing 12% bounce rate. Reduce to 2x/week can save costs',
      savings: '₹32k',
      impact: 'high',
      category: 'targeting',
      actionable: true
    },
    {
      id: '4',
      title: 'Use Dynamic Creative for Push Notifications',
      description: 'Personalized push notifications show 31% better CTR than generic ones',
      savings: '₹12k',
      impact: 'low',
      category: 'creative',
      actionable: false
    }
  ];

  trackById(index: number, insight: OptimizationInsight): string {
    return insight.id;
  }
}