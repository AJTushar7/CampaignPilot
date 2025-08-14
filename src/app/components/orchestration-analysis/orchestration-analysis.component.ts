import { Component, OnInit } from '@angular/core';

interface FallbackStrategy {
  fromChannel: string;
  toChannel: string;
  fromIcon: string;
  toIcon: string;
  successRate: number;
  usage: number;
  isRecommended: boolean;
  tags: string[];
  tagClass: string;
}

@Component({
  selector: 'app-orchestration-analysis',
  templateUrl: './orchestration-analysis.component.html',
  styleUrls: ['./orchestration-analysis.component.scss']
})
export class OrchestrationAnalysisComponent implements OnInit {
  searchQuery = '';
  
  strategies: FallbackStrategy[] = [
    {
      fromChannel: 'SMS',
      toChannel: 'WhatsApp',
      fromIcon: 'pi pi-comment',
      toIcon: 'pi pi-whatsapp',
      successRate: 84,
      usage: 5,
      isRecommended: true,
      tags: ['High Success', 'Cost Effective'],
      tagClass: 'success'
    },
    {
      fromChannel: 'Email',
      toChannel: 'Push',
      fromIcon: 'pi pi-envelope',
      toIcon: 'pi pi-bell',
      successRate: 72,
      usage: 3,
      isRecommended: false,
      tags: ['Mobile First', 'Quick'],
      tagClass: 'info'
    },
    {
      fromChannel: 'WhatsApp',
      toChannel: 'SMS',
      fromIcon: 'pi pi-whatsapp',
      toIcon: 'pi pi-comment',
      successRate: 78,
      usage: 26,
      isRecommended: true,
      tags: ['Popular', 'Reliable'],
      tagClass: 'primary'
    },
    {
      fromChannel: 'RCS',
      toChannel: 'SMS',
      fromIcon: 'pi pi-mobile',
      toIcon: 'pi pi-comment',
      successRate: 91,
      usage: 8,
      isRecommended: true,
      tags: ['Premium', 'High Convert'],
      tagClass: 'success'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  get filteredStrategies(): FallbackStrategy[] {
    if (!this.searchQuery) {
      return this.strategies;
    }
    
    const query = this.searchQuery.toLowerCase();
    return this.strategies.filter(strategy => 
      strategy.fromChannel.toLowerCase().includes(query) ||
      strategy.toChannel.toLowerCase().includes(query) ||
      strategy.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  previousStrategies(): void {
    console.log('Previous strategies clicked');
  }

  nextStrategies(): void {
    console.log('Next strategies clicked');
  }
}