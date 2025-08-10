import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selectedDateRange = 'Last 7 days';
  dateRangeOptions = [
    { label: 'Last 7 days', value: 'Last 7 days' },
    { label: 'Last 30 days', value: 'Last 30 days' },
    { label: 'Last 90 days', value: 'Last 90 days' },
    { label: 'This month', value: 'This month' },
    { label: 'Last month', value: 'Last month' }
  ];

  constructor() {}

  onCreateCampaign() {
    // Navigate to create campaign page
    console.log('Creating new campaign...');
  }
}