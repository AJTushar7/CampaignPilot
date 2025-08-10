import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inactive-customers',
  templateUrl: './inactive-customers.component.html',
  styleUrls: ['./inactive-customers.component.scss']
})
export class InactiveCustomersComponent implements OnInit {
  inactiveCustomers = 2847;
  inactiveDays = 30;
  winBackEligible = 1234;
  highValueCustomers = 567;
  churnRisk = 1046;
  
  customerSegments = [
    {
      label: 'Win-back eligible',
      value: 1234,
      color: 'green',
      description: 'Customers likely to re-engage'
    },
    {
      label: 'High-value customers',
      value: 567,
      color: 'orange',
      description: 'Premium customers worth retaining'
    },
    {
      label: 'Churn risk',
      value: 1046,
      color: 'red',
      description: 'Customers at risk of churning'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  createWinBackCampaign(): void {
    console.log('Creating win-back campaign');
  }

  viewDetailedReport(): void {
    console.log('Viewing detailed inactive customers report');
  }
}