import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

interface FestivalEvent {
  id: string;
  name: string;
  date: string;
  daysLeft: number;
  campaigns: number;
  revenue: string;
  status: 'planned' | 'active' | 'completed';
  color: string;
}

@Component({
  selector: 'app-festival-timeline',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <mat-card>
      <mat-card-header class="pb-3">
        <div class="flex items-center justify-between w-full">
          <mat-card-title class="flex items-center gap-2">
            <mat-icon class="text-orange-500">event</mat-icon>
            Festival Timeline
          </mat-card-title>
          <button mat-button class="text-sm">
            Add Festival
            <mat-icon class="ml-1">add</mat-icon>
          </button>
        </div>
      </mat-card-header>
      <mat-card-content>
        <!-- Timeline -->
        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          
          <div class="space-y-4">
            <div 
              *ngFor="let festival of festivals; trackBy: trackById; let last = last" 
              class="relative flex items-start gap-4 pb-4"
              [class.pb-0]="last">
              
              <!-- Timeline dot -->
              <div 
                class="relative z-10 w-8 h-8 rounded-full border-2 bg-white dark:bg-gray-900 flex items-center justify-center"
                [style.border-color]="festival.color">
                <div 
                  class="w-3 h-3 rounded-full"
                  [style.background-color]="festival.color">
                </div>
              </div>
              
              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-semibold">{{festival.name}}</h4>
                  <span 
                    class="inline-flex h-6 w-auto items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase"
                    [class.bg-blue-100]="festival.status === 'planned'"
                    [class.text-blue-800]="festival.status === 'planned'"
                    [class.bg-green-100]="festival.status === 'active'"
                    [class.text-green-800]="festival.status === 'active'"
                    [class.bg-gray-100]="festival.status === 'completed'"
                    [class.text-gray-800]="festival.status === 'completed'">
                    {{festival.status}}
                  </span>
                </div>
                
                <p class="text-sm text-muted-foreground mb-2">
                  {{festival.date}} 
                  <span *ngIf="festival.daysLeft > 0" class="ml-2">
                    ({{festival.daysLeft}} days left)
                  </span>
                </p>
                
                <div class="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span class="text-muted-foreground">Campaigns:</span>
                    <span class="font-medium ml-1">{{festival.campaigns}}</span>
                  </div>
                  <div>
                    <span class="text-muted-foreground">Revenue:</span>
                    <span class="font-medium ml-1">{{festival.revenue}}</span>
                  </div>
                </div>
                
                <!-- Action buttons for active/planned festivals -->
                <div *ngIf="festival.status !== 'completed'" class="mt-3 flex gap-2">
                  <button 
                    *ngIf="festival.status === 'planned'"
                    mat-stroked-button 
                    color="primary" 
                    class="text-xs h-7">
                    Plan Campaigns
                  </button>
                  <button 
                    *ngIf="festival.status === 'active'"
                    mat-stroked-button 
                    color="accent" 
                    class="text-xs h-7">
                    Monitor Live
                  </button>
                  <button mat-stroked-button class="text-xs h-7">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Insights -->
        <div class="mt-4 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg text-sm">
          <mat-icon class="text-purple-500 mr-2 text-sm align-middle">insights</mat-icon>
          Diwali campaigns historically generate 3.2x higher ROI. Start planning 2 weeks ahead.
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .text-orange-500 {
      color: #f97316;
    }
    .text-purple-500 {
      color: #8b5cf6;
    }
    .text-muted-foreground {
      color: hsl(var(--muted-foreground));
    }
  `]
})
export class FestivalTimelineComponent {
  festivals: FestivalEvent[] = [
    {
      id: '1',
      name: 'Diwali Festival',
      date: 'Nov 12, 2024',
      daysLeft: 28,
      campaigns: 8,
      revenue: '₹2.8L',
      status: 'planned',
      color: '#f97316'
    },
    {
      id: '2',
      name: 'Karva Chauth',
      date: 'Oct 20, 2024',
      daysLeft: 5,
      campaigns: 3,
      revenue: '₹85k',
      status: 'active',
      color: '#8b5cf6'
    },
    {
      id: '3',
      name: 'Navratri',
      date: 'Oct 3-12, 2024',
      daysLeft: 0,
      campaigns: 12,
      revenue: '₹1.2L',
      status: 'completed',
      color: '#10b981'
    },
    {
      id: '4',
      name: 'Christmas',
      date: 'Dec 25, 2024',
      daysLeft: 71,
      campaigns: 0,
      revenue: '₹0',
      status: 'planned',
      color: '#ef4444'
    }
  ];

  trackById(index: number, festival: FestivalEvent): string {
    return festival.id;
  }
}