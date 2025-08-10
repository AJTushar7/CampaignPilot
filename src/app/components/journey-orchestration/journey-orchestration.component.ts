import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-journey-orchestration',
  templateUrl: './journey-orchestration.component.html',
  styleUrls: ['./journey-orchestration.component.scss']
})
export class JourneyOrchestrationComponent implements OnInit {
  journeyFlows = [
    {
      name: 'Email → SMS',
      performance: '+34%',
      status: 'positive',
      color: 'green',
      description: 'Email failed, SMS backup successful'
    },
    {
      name: 'Push → WhatsApp',
      performance: '+12%',
      status: 'positive',
      color: 'orange',
      description: 'Push notification delivered via WhatsApp fallback'
    },
    {
      name: 'SMS → RCS',
      performance: '-8%',
      status: 'negative',
      color: 'red',
      description: 'SMS failed, RCS fallback underperforming'
    }
  ];

  totalFallbacks = 2847;
  successRate = 78.3;
  
  constructor() { }

  ngOnInit(): void {
  }

  viewFullAnalysis(): void {
    // Handle view full analysis action
    console.log('View full journey orchestration analysis');
  }
}