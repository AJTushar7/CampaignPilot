import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { type BSPProvider } from '../../../models/campaign.interface';

@Component({
  selector: 'app-bsp-comparison',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatBadgeModule, MatIconModule],
  template: `
    <mat-card>
      <mat-card-header class="pb-3">
        <mat-card-title class="flex items-center gap-2">
          <mat-icon class="text-purple-500">compare_arrows</mat-icon>
          BSP Comparison
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="space-y-3">
          <div 
            *ngFor="let provider of providers; trackBy: trackByName" 
            class="p-3 border rounded-lg relative transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            [class.bg-green-50]="provider.recommended"
            [class.dark:bg-green-950]="provider.recommended"
            [class.border-green-200]="provider.recommended">
            
            <div *ngIf="provider.recommended" 
                 class="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              Recommended
            </div>
            
            <div class="flex items-center justify-between mb-2">
              <h4 class="font-semibold">{{provider.name}}</h4>
              <span 
                class="inline-flex h-6 w-auto items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase"
                [class.bg-green-100]="provider.tag === 'best value'"
                [class.text-green-800]="provider.tag === 'best value'"
                [class.bg-blue-100]="provider.tag === 'fastest'"
                [class.text-blue-800]="provider.tag === 'fastest'"
                [class.bg-yellow-100]="provider.tag === 'premium'"
                [class.text-yellow-800]="provider.tag === 'premium'">
                {{provider.tag}}
              </span>
            </div>
            
            <div class="grid grid-cols-4 gap-2 text-sm">
              <div class="text-center">
                <div class="text-muted-foreground">Cost</div>
                <div class="font-semibold">₹{{provider.cost}}</div>
              </div>
              <div class="text-center">
                <div class="text-muted-foreground">Delivery</div>
                <div class="font-semibold">{{provider.delivery}}%</div>
              </div>
              <div class="text-center">
                <div class="text-muted-foreground">Engagement</div>
                <div class="font-semibold">{{provider.engagement}}%</div>
              </div>
              <div class="text-center">
                <div class="text-muted-foreground">Support</div>
                <div class="font-semibold">{{provider.support}}/5</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-sm">
          <mat-icon class="text-blue-500 mr-2 text-sm align-middle">info</mat-icon>
          Tip: Switch to Gupshup for WhatsApp to reduce costs by ₹0.02 per message
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .text-purple-500 {
      color: #8b5cf6;
    }
    .text-blue-500 {
      color: #3b82f6;
    }
    .text-muted-foreground {
      color: hsl(var(--muted-foreground));
    }
  `]
})
export class BSPComparisonComponent {
  providers: BSPProvider[] = [
    {
      name: "Gupshup",
      cost: 0.06,
      delivery: 98.2,
      engagement: 84.1,
      support: 4,
      tag: "best value",
      recommended: true
    },
    {
      name: "Twilio",
      cost: 0.08,
      delivery: 97.8,
      engagement: 82.3,
      support: 5,
      tag: "premium",
      recommended: false
    },
    {
      name: "MessageBird",
      cost: 0.07,
      delivery: 96.5,
      engagement: 81.7,
      support: 4,
      tag: "fastest",
      recommended: false
    }
  ];

  trackByName(index: number, provider: BSPProvider): string {
    return provider.name;
  }
}