import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { type AlertItem } from '../../../models/campaign.interface';

@Component({
  selector: 'app-alerts-ticker',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatBadgeModule, MatIconModule],
  template: `
    <mat-card class="overflow-hidden" role="status" aria-live="polite">
      <mat-card-content class="flex items-center gap-3 py-3">
        <div class="flex h-8 w-8 items-center justify-center rounded-md bg-primary-10 text-primary" aria-hidden>
          <mat-icon class="text-sm">campaign</mat-icon>
        </div>
        <div class="flex-1 min-w-0">
          <p class="truncate text-sm">
            {{currentAlert.text}}
            <span *ngIf="currentAlert.time" class="ml-2 inline-flex items-center gap-1 text-muted-foreground">
              <mat-icon class="text-xs">schedule</mat-icon>
              {{currentAlert.time}}
            </span>
          </p>
        </div>
        <span 
          class="inline-flex h-6 w-auto items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground uppercase">
          {{currentAlert.type || 'info'}}
        </span>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .text-primary {
      color: hsl(var(--primary));
    }
    .bg-primary-10 {
      background-color: hsl(var(--primary) / 0.1);
    }
    .text-muted-foreground {
      color: hsl(var(--muted-foreground));
    }
    .text-xs mat-icon {
      font-size: 12px;
      height: 12px;
      width: 12px;
    }
    .text-sm mat-icon {
      font-size: 16px;
      height: 16px;
      width: 16px;
    }
  `]
})
export class AlertsTickerComponent implements OnInit, OnDestroy {
  @Input() items: AlertItem[] = [];
  
  currentIndex = 0;
  currentAlert: AlertItem = { id: '', text: '', type: 'info' };
  private intervalId?: number;

  ngOnInit() {
    if (this.items.length > 0) {
      this.currentAlert = this.items[0];
      
      if (this.items.length > 1) {
        this.intervalId = window.setInterval(() => {
          this.currentIndex = (this.currentIndex + 1) % this.items.length;
          this.currentAlert = this.items[this.currentIndex];
        }, 5000);
      }
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}