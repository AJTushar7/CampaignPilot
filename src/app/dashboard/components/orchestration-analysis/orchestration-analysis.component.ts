import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';

interface OrchestrationFlow {
  id: string;
  name: string;
  primary: string;
  fallback: string[];
  conversion: number;
  cost: number;
  efficiency: number;
  volume: number;
}

interface ChannelMetrics {
  channel: string;
  role: 'primary' | 'fallback';
  volume: number;
  success: number;
  cost: number;
  color: string;
}

@Component({
  selector: 'app-orchestration-analysis',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatProgressBarModule, 
    MatTabsModule
  ],
  template: `
    <mat-card>
      <mat-card-header class="pb-3">
        <div class="flex items-center justify-between w-full">
          <mat-card-title class="flex items-center gap-2">
            <mat-icon class="text-cyan-500">account_tree</mat-icon>
            Orchestration Analysis
          </mat-card-title>
          <button mat-button class="text-sm">
            Optimize Flows
            <mat-icon class="ml-1">auto_fix_high</mat-icon>
          </button>
        </div>
      </mat-card-header>
      <mat-card-content>
        <mat-tab-group>
          <!-- Flow Performance Tab -->
          <mat-tab label="Flow Performance">
            <div class="pt-4 space-y-4">
              <div 
                *ngFor="let flow of orchestrationFlows; trackBy: trackFlowById"
                class="p-3 border rounded-lg">
                
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-semibold">{{flow.name}}</h4>
                  <div class="text-sm">
                    <span class="text-muted-foreground">Efficiency: </span>
                    <span 
                      class="font-semibold"
                      [class.text-green-600]="flow.efficiency >= 85"
                      [class.text-yellow-600]="flow.efficiency >= 70 && flow.efficiency < 85"
                      [class.text-red-600]="flow.efficiency < 70">
                      {{flow.efficiency}}%
                    </span>
                  </div>
                </div>
                
                <div class="mb-3">
                  <div class="flex items-center gap-2 text-sm mb-1">
                    <span class="text-muted-foreground">Primary:</span>
                    <span class="font-medium">{{flow.primary}}</span>
                    <mat-icon class="text-xs text-blue-500">arrow_forward</mat-icon>
                    <span class="text-muted-foreground">Fallback:</span>
                    <span class="font-medium">{{flow.fallback.join(', ')}}</span>
                  </div>
                </div>
                
                <div class="grid grid-cols-3 gap-3 text-sm mb-3">
                  <div class="text-center">
                    <div class="text-muted-foreground">Volume</div>
                    <div class="font-semibold">{{flow.volume | number}}k</div>
                  </div>
                  <div class="text-center">
                    <div class="text-muted-foreground">Conversion</div>
                    <div class="font-semibold">{{flow.conversion}}%</div>
                  </div>
                  <div class="text-center">
                    <div class="text-muted-foreground">Cost</div>
                    <div class="font-semibold">₹{{flow.cost | number:'1.2-2'}}</div>
                  </div>
                </div>
                
                <mat-progress-bar 
                  mode="determinate" 
                  [value]="flow.efficiency"
                  [color]="flow.efficiency >= 85 ? 'primary' : flow.efficiency >= 70 ? 'accent' : 'warn'">
                </mat-progress-bar>
              </div>
            </div>
          </mat-tab>
          
          <!-- Channel Distribution Tab -->
          <mat-tab label="Channel Distribution">
            <div class="pt-4">
              <div class="grid grid-cols-2 gap-4">
                <!-- Primary Channels -->
                <div>
                  <h4 class="font-medium mb-3 flex items-center gap-2">
                    <mat-icon class="text-blue-500 text-sm">star</mat-icon>
                    Primary Channels
                  </h4>
                  <div class="space-y-2">
                    <div 
                      *ngFor="let metric of channelMetrics; trackBy: trackChannelById"
                      class="p-2 border rounded">
                      <div *ngIf="metric.role === 'primary'">
                        <div class="flex items-center justify-between mb-1">
                          <div class="flex items-center gap-2">
                            <div 
                              class="w-3 h-3 rounded-full"
                              [style.background-color]="metric.color">
                            </div>
                            <span class="font-medium text-sm">{{metric.channel}}</span>
                          </div>
                          <span class="text-sm text-muted-foreground">{{metric.volume | number}}k</span>
                        </div>
                        <div class="text-xs text-muted-foreground">
                          Success: {{metric.success}}% • Cost: ₹{{metric.cost | number:'1.2-2'}}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Fallback Channels -->
                <div>
                  <h4 class="font-medium mb-3 flex items-center gap-2">
                    <mat-icon class="text-orange-500 text-sm">backup</mat-icon>
                    Fallback Channels
                  </h4>
                  <div class="space-y-2">
                    <div 
                      *ngFor="let metric of channelMetrics; trackBy: trackChannelById"
                      class="p-2 border rounded">
                      <div *ngIf="metric.role === 'fallback'">
                        <div class="flex items-center justify-between mb-1">
                          <div class="flex items-center gap-2">
                            <div 
                              class="w-3 h-3 rounded-full"
                              [style.background-color]="metric.color">
                            </div>
                            <span class="font-medium text-sm">{{metric.channel}}</span>
                          </div>
                          <span class="text-sm text-muted-foreground">{{metric.volume | number}}k</span>
                        </div>
                        <div class="text-xs text-muted-foreground">
                          Success: {{metric.success}}% • Cost: ₹{{metric.cost | number:'1.2-2'}}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>

        <!-- Insights -->
        <div class="mt-4 p-3 bg-cyan-50 dark:bg-cyan-950/20 rounded-lg text-sm">
          <mat-icon class="text-cyan-500 mr-2 text-sm align-middle">psychology</mat-icon>
          WhatsApp → SMS orchestration reduces overall cost by 18% while maintaining 95% delivery rate
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .text-cyan-500 {
      color: #06b6d4;
    }
    .text-blue-500 {
      color: #3b82f6;
    }
    .text-orange-500 {
      color: #f97316;
    }
    .text-green-600 {
      color: #059669;
    }
    .text-yellow-600 {
      color: #d97706;
    }
    .text-red-600 {
      color: #dc2626;
    }
    .text-muted-foreground {
      color: hsl(var(--muted-foreground));
    }
  `]
})
export class OrchestrationAnalysisComponent {
  orchestrationFlows: OrchestrationFlow[] = [
    {
      id: '1',
      name: 'Premium Customer Journey',
      primary: 'WhatsApp',
      fallback: ['SMS', 'Email'],
      conversion: 92.4,
      cost: 0.08,
      efficiency: 88,
      volume: 2.1
    },
    {
      id: '2',
      name: 'Service Reminder Flow',
      primary: 'SMS',
      fallback: ['WhatsApp'],
      conversion: 78.3,
      cost: 0.12,
      efficiency: 76,
      volume: 5.2
    },
    {
      id: '3',
      name: 'Promotional Campaign',
      primary: 'Email',
      fallback: ['Push', 'SMS'],
      conversion: 65.7,
      cost: 0.03,
      efficiency: 94,
      volume: 8.5
    }
  ];

  channelMetrics: ChannelMetrics[] = [
    { channel: 'WhatsApp', role: 'primary', volume: 3.2, success: 97.8, cost: 0.08, color: '#25D366' },
    { channel: 'Email', role: 'primary', volume: 8.5, success: 89.3, cost: 0.03, color: '#4ECDC4' },
    { channel: 'SMS', role: 'primary', volume: 5.2, success: 94.2, cost: 0.12, color: '#FF6B6B' },
    { channel: 'SMS', role: 'fallback', volume: 1.8, success: 91.5, cost: 0.12, color: '#FF6B6B' },
    { channel: 'Push', role: 'fallback', volume: 2.3, success: 85.7, cost: 0.02, color: '#45B7D1' },
    { channel: 'WhatsApp', role: 'fallback', volume: 0.9, success: 96.1, cost: 0.08, color: '#25D366' }
  ];

  trackFlowById(index: number, flow: OrchestrationFlow): string {
    return flow.id;
  }

  trackChannelById(index: number, metric: ChannelMetrics): string {
    return `${metric.channel}-${metric.role}`;
  }
}