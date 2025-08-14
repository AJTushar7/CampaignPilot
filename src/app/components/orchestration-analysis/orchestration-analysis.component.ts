import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orchestration-analysis',
  templateUrl: './orchestration-analysis.component.html',
  styleUrls: ['./orchestration-analysis.component.scss']
})
export class OrchestrationAnalysisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  previousStrategies(): void {
    // Logic to show previous set of strategies
    console.log('Previous strategies clicked');
  }

  nextStrategies(): void {
    // Logic to show next set of strategies
    console.log('Next strategies clicked');
  }
}