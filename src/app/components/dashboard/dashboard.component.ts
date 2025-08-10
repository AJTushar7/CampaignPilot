import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dateRangeOptions = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 15 days', value: '15d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 45 days', value: '45d' },
    { label: 'Last 60 days', value: '60d' },
    { label: 'Last 90 days', value: '90d' }
  ];
  
  selectedDateRange = '15d';

  // Dashboard metrics
  totalCampaigns = 24;
  totalReach = 1250000;
  totalSpend = 12400;
  dataAge = 15; // This would be dynamically calculated based on actual data

  constructor() { }

  ngOnInit(): void {
    // Simulate data age calculation based on selected date range
    this.updateDataAge();
  }

  updateDataAge(): void {
    const rangeMap: { [key: string]: number } = {
      '7d': 7,
      '15d': 15,
      '30d': 30,
      '45d': 45,
      '60d': 60,
      '90d': 90
    };
    this.dataAge = rangeMap[this.selectedDateRange] || 15;
  }

  getDataAgeDescription(): string {
    if (this.dataAge >= 60) {
      return 'Advanced analytics available';
    } else if (this.dataAge >= 45) {
      return 'Festival planning enabled';
    } else if (this.dataAge >= 30) {
      return 'Customer insights available';
    } else {
      return 'Basic analytics mode';
    }
  }

  onCreateCampaign(): void {
    console.log('Creating new campaign...');
  }

  onDateRangeChange(): void {
    this.updateDataAge();
    console.log('Date range changed to:', this.selectedDateRange);
  }
}