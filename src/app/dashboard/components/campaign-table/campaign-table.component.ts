import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { type Campaign } from '../../../models/campaign.interface';

@Component({
  selector: 'app-campaign-table',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatTableModule, 
    MatBadgeModule, 
    MatSelectModule, 
    MatProgressBarModule
  ],
  template: `
    <mat-card>
      <mat-card-header class="pb-3">
        <div class="flex items-center justify-between w-full">
          <mat-card-title class="flex items-center gap-2">
            <mat-icon class="text-indigo-500">campaign</mat-icon>
            Recent Campaigns
          </mat-card-title>
          <div class="flex items-center gap-2">
            <mat-select value="all" class="w-32">
              <mat-option value="all">All Status</mat-option>
              <mat-option value="active">Active</mat-option>
              <mat-option value="scheduled">Scheduled</mat-option>
              <mat-option value="completed">Completed</mat-option>
            </mat-select>
            <button mat-button>
              <mat-icon>filter_list</mat-icon>
            </button>
          </div>
        </div>
      </mat-card-header>
      <mat-card-content class="p-0">
        <div class="overflow-x-auto">
          <table mat-table [dataSource]="campaigns" class="w-full">
            
            <!-- Campaign Name Column -->
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef class="text-left font-medium">Campaign</th>
              <td mat-cell *matCellDef="let campaign" class="text-left">
                <div>
                  <div class="font-medium">{{campaign.name}}</div>
                  <div class="text-sm text-muted-foreground">{{campaign.segment}}</div>
                </div>
              </td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef class="text-center font-medium">Status</th>
              <td mat-cell *matCellDef="let campaign" class="text-center">
                <span 
                  class="inline-flex h-6 w-auto items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase"
                  [class.bg-green-100]="campaign.status === 'active'"
                  [class.text-green-800]="campaign.status === 'active'"
                  [class.bg-blue-100]="campaign.status === 'scheduled'"
                  [class.text-blue-800]="campaign.status === 'scheduled'"
                  [class.bg-gray-100]="campaign.status === 'completed'"
                  [class.text-gray-800]="campaign.status === 'completed'">
                  {{campaign.status}}
                </span>
              </td>
            </ng-container>

            <!-- Channel Column -->
            <ng-container matColumnDef="channel">
              <th mat-header-cell *matHeaderCellDef class="text-center font-medium">Channel</th>
              <td mat-cell *matCellDef="let campaign" class="text-center">
                <div class="flex items-center justify-center gap-1">
                  <mat-icon class="text-sm">{{getChannelIcon(campaign.channel)}}</mat-icon>
                  <span class="text-sm">{{campaign.channel}}</span>
                </div>
              </td>
            </ng-container>

            <!-- Start Time Column -->
            <ng-container matColumnDef="startAt">
              <th mat-header-cell *matHeaderCellDef class="text-center font-medium">Start Time</th>
              <td mat-cell *matCellDef="let campaign" class="text-center">
                <span class="text-sm">{{campaign.startAt}}</span>
              </td>
            </ng-container>

            <!-- Progress Column -->
            <ng-container matColumnDef="progress">
              <th mat-header-cell *matHeaderCellDef class="text-center font-medium">Progress</th>
              <td mat-cell *matCellDef="let campaign" class="text-center">
                <div class="w-full">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs">{{campaign.progress}}%</span>
                    <span *ngIf="campaign.errors > 0" class="text-xs text-red-500">
                      {{campaign.errors}} errors
                    </span>
                  </div>
                  <mat-progress-bar 
                    mode="determinate" 
                    [value]="campaign.progress"
                    [color]="campaign.errors > 0 ? 'warn' : 'primary'">
                  </mat-progress-bar>
                </div>
              </td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef class="text-right font-medium">Actions</th>
              <td mat-cell *matCellDef="let campaign" class="text-right">
                <div class="flex items-center justify-end gap-1">
                  <button mat-icon-button [disabled]="campaign.status === 'completed'">
                    <mat-icon>play_arrow</mat-icon>
                  </button>
                  <button mat-icon-button [disabled]="campaign.status === 'completed'">
                    <mat-icon>pause</mat-icon>
                  </button>
                  <button mat-icon-button>
                    <mat-icon>more_vert</mat-icon>
                  </button>
                </div>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-gray-50 dark:hover:bg-gray-800"></tr>
          </table>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .text-indigo-500 {
      color: #6366f1;
    }
    .text-red-500 {
      color: #ef4444;
    }
    .text-muted-foreground {
      color: hsl(var(--muted-foreground));
    }
    .mat-mdc-table {
      width: 100%;
    }
    .mat-mdc-row:hover {
      background-color: rgb(249 250 251 / 1);
    }
    .dark .mat-mdc-row:hover {
      background-color: rgb(31 41 55 / 1);
    }
  `]
})
export class CampaignTableComponent {
  displayedColumns: string[] = ['name', 'status', 'channel', 'startAt', 'progress', 'actions'];
  
  campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Diwali Festival Sale',
      segment: 'Premium Customers (2.1k)',
      status: 'active',
      channel: 'WhatsApp',
      startAt: 'Oct 15, 3:25 PM',
      progress: 67,
      errors: 0,
      retryCost: 0
    },
    {
      id: '2',
      name: 'Service Reminder',
      segment: 'Service Due (5.2k)',
      status: 'scheduled',
      channel: 'SMS',
      startAt: 'Oct 16, 9:00 AM',
      progress: 0,
      errors: 0,
      retryCost: 0
    },
    {
      id: '3',
      name: 'New Model Launch',
      segment: 'Interest Prospects (1.8k)',
      status: 'active',
      channel: 'Email',
      startAt: 'Oct 14, 2:00 PM',
      progress: 89,
      errors: 12,
      retryCost: 150
    },
    {
      id: '4',
      name: 'Test Drive Campaign',
      segment: 'Website Visitors (850)',
      status: 'completed',
      channel: 'Push',
      startAt: 'Oct 13, 11:30 AM',
      progress: 100,
      errors: 3,
      retryCost: 45
    },
    {
      id: '5',
      name: 'Insurance Renewal',
      segment: 'Renewal Due (3.1k)',
      status: 'active',
      channel: 'RCS',
      startAt: 'Oct 15, 8:00 AM',
      progress: 34,
      errors: 8,
      retryCost: 80
    }
  ];

  getChannelIcon(channel: string): string {
    const iconMap: Record<string, string> = {
      'WhatsApp': 'chat',
      'SMS': 'message',
      'Email': 'email',
      'Push': 'notifications',
      'RCS': 'chat_bubble'
    };
    return iconMap[channel] || 'campaign';
  }
}