import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { type ChannelData } from '../../../models/campaign.interface';

@Component({
  selector: 'app-channel-overview',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatBadgeModule, MatIconModule],
  template: `
    <mat-card>
      <mat-card-header class="pb-3">
        <div class="flex items-center justify-between w-full">
          <mat-card-title class="flex items-center gap-2">
            <mat-icon class="text-blue-500">trending_up</mat-icon>
            Channel Performance
          </mat-card-title>
          <div class="flex gap-1">
            <button 
              mat-raised-button
              [color]="activeMetric === 'delivery' ? 'primary' : ''"
              (click)="setActiveMetric('delivery')"
              class="h-7 text-xs">
              Delivery
            </button>
            <button 
              mat-raised-button
              [color]="activeMetric === 'engagement' ? 'primary' : ''"
              (click)="setActiveMetric('engagement')"
              class="h-7 text-xs">
              Engagement
            </button>
          </div>
        </div>
      </mat-card-header>
      <mat-card-content>
        <!-- Performance Cards Grid -->
        <div class="grid grid-cols-5 gap-2 mb-4">
          <div 
            *ngFor="let channel of channels" 
            class="p-2 border rounded bg-gray-50 dark:bg-gray-800 relative"
            [class.bg-green-50]="channel.recommended"
            [class.dark:bg-green-950]="channel.recommended"
            [class.border-green-200]="channel.recommended">
            <div class="flex items-center gap-1 mb-1">
              <div 
                class="w-2 h-2 rounded-full" 
                [style.background-color]="channel.color">
              </div>
              <span class="font-medium text-xs">{{channel.name}}</span>
              <div 
                *ngIf="channel.recommended" 
                class="w-1 h-1 bg-green-500 rounded-full">
              </div>
            </div>
            <div class="space-y-0.5">
              <div class="flex justify-between text-xs">
                <span class="text-muted-foreground">
                  {{activeMetric === 'delivery' ? 'Del' : 'Eng'}}
                </span>
                <span class="font-semibold">
                  {{activeMetric === 'delivery' ? channel.delivery : channel.engagement}}%
                </span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-muted-foreground">Cost</span>
                <span class="font-semibold">₹{{channel.cpm.toFixed(2)}}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart Placeholder -->
        <div class="h-[160px] flex items-center justify-center border rounded">
          <p class="text-muted-foreground">Chart will be implemented with ng2-charts</p>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .text-blue-500 {
      color: #3b82f6;
    }
    .text-muted-foreground {
      color: hsl(var(--muted-foreground));
    }
  `]
})
export class ChannelOverviewComponent {
  activeMetric: 'delivery' | 'engagement' = 'delivery';
  
  channels: ChannelData[] = [
    { name: "WhatsApp", delivery: 97.8, engagement: 82.1, cpm: 0.08, color: "#25D366", recommended: true },
    { name: "SMS", delivery: 94.2, engagement: 58.4, cpm: 0.12, color: "#FF6B6B" },
    { name: "Email", delivery: 96.0, engagement: 41.2, cpm: 0.03, color: "#4ECDC4" },
    { name: "Push", delivery: 92.5, engagement: 38.6, cpm: 0.02, color: "#45B7D1" },
    { name: "RCS", delivery: 89.3, engagement: 71.8, cpm: 0.15, color: "#96CEB4" },
  ];

  setActiveMetric(metric: 'delivery' | 'engagement') {
    this.activeMetric = metric;
  }
}