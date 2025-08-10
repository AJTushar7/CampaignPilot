import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface BudgetData {
  channel: string;
  allocated: number;
  spent: number;
  remaining: number;
  efficiency: number;
  color: string;
}

@Component({
  selector: 'app-budget-performance',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  template: `
    <mat-card>
      <mat-card-header class="pb-3">
        <div class="flex items-center justify-between w-full">
          <mat-card-title class="flex items-center gap-2">
            <mat-icon class="text-green-500">account_balance_wallet</mat-icon>
            Budget Performance
          </mat-card-title>
          <button mat-button class="text-sm">
            View Details
            <mat-icon class="ml-1">arrow_forward</mat-icon>
          </button>
        </div>
      </mat-card-header>
      <mat-card-content>
        <!-- Overall Budget Summary -->
        <div class="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <div class="text-sm text-muted-foreground">Total Allocated</div>
              <div class="text-lg font-semibold">₹{{totalAllocated | number:'1.1-1'}}L</div>
            </div>
            <div>
              <div class="text-sm text-muted-foreground">Total Spent</div>
              <div class="text-lg font-semibold">₹{{totalSpent | number:'1.1-1'}}L</div>
            </div>
            <div>
              <div class="text-sm text-muted-foreground">Remaining</div>
              <div class="text-lg font-semibold text-green-600">₹{{totalRemaining | number:'1.1-1'}}L</div>
            </div>
          </div>
        </div>

        <!-- Channel-wise Budget -->
        <div class="space-y-3">
          <div 
            *ngFor="let item of budgetData; trackBy: trackByChannel" 
            class="p-3 border rounded-lg">
            
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <div 
                  class="w-3 h-3 rounded-full" 
                  [style.background-color]="item.color">
                </div>
                <span class="font-medium">{{item.channel}}</span>
              </div>
              <div class="text-sm">
                <span class="text-muted-foreground">Efficiency: </span>
                <span 
                  class="font-semibold"
                  [class.text-green-600]="item.efficiency >= 85"
                  [class.text-yellow-600]="item.efficiency >= 70 && item.efficiency < 85"
                  [class.text-red-600]="item.efficiency < 70">
                  {{item.efficiency}}%
                </span>
              </div>
            </div>
            
            <div class="mb-2">
              <mat-progress-bar 
                mode="determinate" 
                [value]="(item.spent / item.allocated) * 100"
                [color]="getProgressColor(item.spent / item.allocated)">
              </mat-progress-bar>
            </div>
            
            <div class="flex justify-between text-xs text-muted-foreground">
              <span>Spent: ₹{{item.spent | number:'1.1-1'}}L</span>
              <span>Allocated: ₹{{item.allocated | number:'1.1-1'}}L</span>
            </div>
          </div>
        </div>

        <!-- Insights -->
        <div class="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg text-sm">
          <mat-icon class="text-yellow-600 mr-2 text-sm align-middle">lightbulb</mat-icon>
          WhatsApp campaigns are 23% more cost-effective than SMS this month
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .text-green-500 {
      color: #10b981;
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
export class BudgetPerformanceComponent {
  budgetData: BudgetData[] = [
    { 
      channel: 'WhatsApp', 
      allocated: 15.0, 
      spent: 12.8, 
      remaining: 2.2, 
      efficiency: 89, 
      color: '#25D366' 
    },
    { 
      channel: 'SMS', 
      allocated: 10.0, 
      spent: 8.5, 
      remaining: 1.5, 
      efficiency: 76, 
      color: '#FF6B6B' 
    },
    { 
      channel: 'Email', 
      allocated: 5.0, 
      spent: 3.2, 
      remaining: 1.8, 
      efficiency: 92, 
      color: '#4ECDC4' 
    },
    { 
      channel: 'Push', 
      allocated: 3.0, 
      spent: 2.1, 
      remaining: 0.9, 
      efficiency: 85, 
      color: '#45B7D1' 
    }
  ];

  get totalAllocated(): number {
    return this.budgetData.reduce((sum, item) => sum + item.allocated, 0);
  }

  get totalSpent(): number {
    return this.budgetData.reduce((sum, item) => sum + item.spent, 0);
  }

  get totalRemaining(): number {
    return this.budgetData.reduce((sum, item) => sum + item.remaining, 0);
  }

  trackByChannel(index: number, item: BudgetData): string {
    return item.channel;
  }

  getProgressColor(ratio: number): 'primary' | 'accent' | 'warn' {
    if (ratio <= 0.7) return 'primary';
    if (ratio <= 0.9) return 'accent';
    return 'warn';
  }
}